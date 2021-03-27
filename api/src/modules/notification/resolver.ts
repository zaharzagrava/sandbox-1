import {
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import { knex } from '../../knex';
import { NOTIFICATION, EVENT, NOTIFICATION_EVENT } from '../../types';

import { errorWrapper } from '../../middleware';
import { eventFields } from '../../utils';

import { Notification, NotificationReq } from './model';
import {
  GetNotificationArgs,
  PostNotificationArgs,
} from './args-types';
import { EventReq } from '../event/model';

@Resolver(Notification)
export class NotificationResolver {
  @UseMiddleware(errorWrapper)
  @Query(() => Notification)
  async getNotification(
    @Args() getNotificationArgs: GetNotificationArgs,
  ): Promise<NotificationReq> {
    return (
      await knex
        .select('*')
        .from(NOTIFICATION)
        .whereRaw('id = ?', [getNotificationArgs.id])
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Notification)
  async postNotification(
    @Args() postNotificationArgs: PostNotificationArgs,
  ): Promise<NotificationReq> {
    return (
      await knex(NOTIFICATION)
        .insert({
          id: uuidv4(),
          text: postNotificationArgs.text,
          created_at: new Date(),
        })
        .returning('*')
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async event(
    @Root() notification: NotificationReq,
  ): Promise<EventReq> {
    const response = await knex
      .select(eventFields)
      .join(
        NOTIFICATION_EVENT,
        `${NOTIFICATION}.id`,
        `${NOTIFICATION_EVENT}.notification_id`,
      )
      .join(EVENT, `${NOTIFICATION_EVENT}.event_id`, `${EVENT}.id`)
      .where(`${NOTIFICATION}.id`, notification.id)
      .from(NOTIFICATION);

    return response[0];
  }
}
