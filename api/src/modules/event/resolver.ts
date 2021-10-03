import {
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { ErrorCodes, Errors } from "../../error";
import { knex } from "../../knex";
import { DBTable } from "../../types";

import { errorWrapper } from "../../middleware";
import { userFields } from "../../utils";

import { Event, EventReq } from "./model";
import {
  DeleteEventArgs,
  GetEventArgs,
  PostEventArgs,
  PutEventArgs,
  PutEventFields,
} from "./args-types";
import { UserReq } from "../user/model";

@Resolver(Event)
export class EventResolver {
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
  async postEvent(@Args() postEventArgs: PostEventArgs): Promise<EventReq> {
    return (
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
      .from(DBTable.EVENT)) as Event;

    if (!event) throw new Errors([ErrorCodes.EVENT_NOT_FOUND]);

    return true;
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
}
