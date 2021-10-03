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
import { knex } from "../../knex";
import { DBTable } from "../../types";

import { errorWrapper } from "../../middleware";
import { eventFields } from "../../utils";

import { Notification, NotificationReq } from "./model";
import { GetNotificationArgs, PostNotificationArgs } from "./args-types";
import { EventReq } from "../event/model";

@Resolver(Notification)
export class NotificationResolver {
  @UseMiddleware(errorWrapper)
  @Query(() => Notification)
  async getNotification(
    @Args() getNotificationArgs: GetNotificationArgs
  ): Promise<NotificationReq> {
    return (
      await knex
        .select("*")
        .from(DBTable.NOTIFICATION)
        .whereRaw("id = ?", [getNotificationArgs.id])
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Notification)
  async postNotification(
    @Args() postNotificationArgs: PostNotificationArgs
  ): Promise<NotificationReq> {
    return (
      await knex(DBTable.NOTIFICATION)
        .insert({
          id: uuidv4(),
          text: postNotificationArgs.text,
          created_at: new Date(),
        })
        .returning("*")
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async event(@Root() notification: NotificationReq): Promise<EventReq> {
    const response = await knex
      .select(eventFields)
      .join(
        DBTable.NOTIFICATION_EVENT,
        `${DBTable.NOTIFICATION}.id`,
        `${DBTable.NOTIFICATION_EVENT}.notification_id`
      )
      .join(
        DBTable.EVENT,
        `${DBTable.NOTIFICATION_EVENT}.event_id`,
        `${DBTable.EVENT}.id`
      )
      .where(`${DBTable.NOTIFICATION}.id`, notification.id)
      .from(DBTable.NOTIFICATION);

    return response[0];
  }
}
