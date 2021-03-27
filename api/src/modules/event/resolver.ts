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
import { EVENT, USER, USER_EVENT } from '../../types';

import { errorWrapper } from '../../middleware';
import { userFields } from '../../utils';

import { Event, EventReq } from './model';
import { GetEventArgs, PostEventArgs } from './args-types';
import { UserReq } from '../user/model';

@Resolver(Event)
export class EventResolver {
  @UseMiddleware(errorWrapper)
  @Query(() => Event)
  async getEvent(
    @Args() getEventArgs: GetEventArgs,
  ): Promise<EventReq> {
    return (
      await knex
        .select('*')
        .from(EVENT)
        .whereRaw('id = ?', [getEventArgs.id])
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Event)
  async postEvent(
    @Args() postEventArgs: PostEventArgs,
  ): Promise<EventReq> {
    return (
      await knex(EVENT)
        .insert({
          id: uuidv4(),
          name: postEventArgs.name,
          description: postEventArgs.description,
          scheduled_at: postEventArgs.scheduled_at,
          created_at: new Date(),
        })
        .returning('*')
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async organizer(@Root() event: EventReq): Promise<UserReq> {
    const response = await knex
      .select(userFields)
      .join(USER_EVENT, `${EVENT}.id`, `${USER_EVENT}.event_id`)
      .join(USER, `${USER_EVENT}.user_id`, `${USER}.id`)
      .where(`user_event.is_organizer`, true)
      .where(`${EVENT}.id`, event.id)
      .from(EVENT);

    return response[0];
  }
}
