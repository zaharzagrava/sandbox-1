import {
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { TooManyRequestsException } from "@aws-sdk/client-sesv2";
import { EmailService } from "../email/service";
import { ErrorCodes, Errors } from "../../error";
import { knex } from "../../knex";
import { Context, DBTable, EventFields } from "../../types";

import { errorWrapper } from "../../middleware";
import { notificationFields, userFields } from "../../utils";

import { Event, EventReq } from "./model";
import {
  DeleteEventArgs,
  GetEventArgs,
  PostEventArgs,
  PutEventArgs,
  PutEventFields,
  RegisterForEventArgs,
} from "./args-types";
import { UserReq } from "../user/model";
import { Notification, NotificationReq } from "../notification/model";

type Beta = keyof EventResolver;
@Resolver(Event)
export class EventResolver {
  @UseMiddleware(errorWrapper)
  @Query(() => [Event])
  async getAllEvents(): Promise<EventReq[]> {
    return knex.select("*").from(DBTable.EVENT);
  }

  @UseMiddleware(errorWrapper)
  @Query(() => [Event])
  async getLatestEvents(): Promise<EventReq[]> {
    return knex
      .select("*")
      .from(DBTable.EVENT)
      .orderBy(EventFields.SCHEDULED_AT, "desc");
  }

  @UseMiddleware(errorWrapper)
  @Query(() => Event)
  async getEvent(@Args() getEventArgs: GetEventArgs): Promise<EventReq> {
    return (
      await knex
        .select("*")
        .from(DBTable.EVENT)
        .whereRaw("id = ?", [getEventArgs.id])
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Event)
  async postEvent(
    @Args() postEventArgs: PostEventArgs,

    @Ctx() ctx: Context
  ): Promise<EventReq> {
    if (!ctx.sessionUser) throw new Errors([ErrorCodes.USER_UNAUTHORIZED]);

    const newEvent = (
      await knex(DBTable.EVENT)
        .insert({
          id: uuidv4(),
          name: postEventArgs.name,
          description: postEventArgs.description,
          scheduled_at: postEventArgs.scheduled_at,
          created_at: new Date(),
        })
        .returning("*")
    )[0];

    const newUserEvent = (
      await knex(DBTable.USER_EVENT)
        .insert({
          id: uuidv4(),
          event_id: newEvent.id,
          user_id: ctx.sessionUser.id,
          is_organizer: true,
          is_participant: false,
          is_watcher: false,
          created_at: new Date(),
        })
        .returning("*")
    )[0];

    return newEvent;
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Boolean)
  async registerForEvent(
    @Args() registerForEventArgs: RegisterForEventArgs,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    if (!ctx.sessionUser) throw new Errors([ErrorCodes.USER_UNAUTHORIZED]);

    const userEvent = (
      await knex(DBTable.USER_EVENT)
        .select("*")
        .where("event_id", registerForEventArgs.event_id)
        .where("user_id", ctx.sessionUser.id)
        .from(DBTable.USER_EVENT)
    )[0];

    console.log("@userEvent");
    console.log(userEvent);
    if (!userEvent) {
      await knex(DBTable.USER_EVENT).insert({
        id: uuidv4(),
        is_watcher: true,
        event_id: registerForEventArgs.event_id,
        user_id: ctx.sessionUser.id,
        created_at: new Date(),
      });

      return true;
    }

    await knex(DBTable.USER_EVENT)
      .update({
        is_watcher: true,
      })
      .where("id", userEvent.id);

    return true;
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Event)
  async putEvent(@Args() putEventArgs: PutEventArgs): Promise<EventReq> {
    const updateEvent: PutEventFields = {};
    for (const [key, value] of Object.entries(putEventArgs.fields))
      if (value !== undefined) updateEvent[key as keyof PutEventFields] = value;

    let updatedEvent = null;
    [updatedEvent] = await knex<EventReq>(DBTable.EVENT)
      .update(updateEvent)
      .where("id", putEventArgs.id)
      .returning("*");

    return updatedEvent;
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Boolean)
  async deleteEvent(
    @Args() deleteEventArgs: DeleteEventArgs
  ): Promise<Boolean> {
    const event = (await knex
      .delete("*")
      .where("id", deleteEventArgs.id)
      .from(DBTable.EVENT)) as Event[];

    if (event.length === 0) throw new Errors([ErrorCodes.EVENT_NOT_FOUND]);

    return true;
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async participants(@Root() event: EventReq): Promise<UserReq[]> {
    const response = await knex
      .select(userFields)
      .join(
        DBTable.USER_EVENT,
        `${DBTable.EVENT}.id`,
        `${DBTable.USER_EVENT}.event_id`
      )
      .join(DBTable.USER, `${DBTable.USER_EVENT}.user_id`, `${DBTable.USER}.id`)
      .where(`user_event.is_watcher`, true)
      .where(`${DBTable.EVENT}.id`, event.id)
      .from(DBTable.EVENT);

    console.log("@response");
    console.log(response);

    return response;
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async organizer(@Root() event: EventReq): Promise<UserReq> {
    const response = await knex
      .select(userFields)
      .join(
        DBTable.USER_EVENT,
        `${DBTable.EVENT}.id`,
        `${DBTable.USER_EVENT}.event_id`
      )
      .join(DBTable.USER, `${DBTable.USER_EVENT}.user_id`, `${DBTable.USER}.id`)
      .where(`user_event.is_organizer`, true)
      .where(`${DBTable.EVENT}.id`, event.id)
      .from(DBTable.EVENT);

    return response[0];
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async notifications(@Root() event: EventReq): Promise<Notification[]> {
    const response = await knex
      .select(notificationFields)
      .join(
        DBTable.NOTIFICATION_EVENT,
        `${DBTable.EVENT}.id`,
        `${DBTable.NOTIFICATION_EVENT}.event_id`
      )
      .join(
        DBTable.NOTIFICATION,
        `${DBTable.NOTIFICATION_EVENT}.notification_id`,
        `${DBTable.NOTIFICATION}.id`
      )
      .where(`${DBTable.EVENT}.id`, event.id)
      .from(DBTable.EVENT);

    return response;
  }
}
