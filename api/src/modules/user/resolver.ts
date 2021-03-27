import {
  Args,
  FieldResolver,
  Info,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import { eventFields } from '../../utils';
import { knex } from '../../knex';
import { EVENT, USER, USER_EVENT } from '../../types';

import { errorWrapper } from '../../middleware';

import { User, UserReq } from './model';
import { GetUserArgs, PostUserArgs } from './args-types';
import { Event, EventReq } from '../event/model';

@Resolver(User)
export class UserResolver {
  @UseMiddleware(errorWrapper)
  @Query(() => User)
  async getUser(
    @Args() getUserArgs: GetUserArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserReq> {
    return (
      await knex
        .select('*')
        .from(USER)
        .whereRaw('id = ?', [getUserArgs.id])
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => User)
  async postUser(
    @Args() postUserArgs: PostUserArgs,
  ): Promise<UserReq> {
    return (
      await knex(USER)
        .insert({
          id: uuidv4(),
          email: postUserArgs.email,
          full_name: postUserArgs.full_name,
          language: postUserArgs.language,
          bio: postUserArgs.bio || null,
          phone_number: postUserArgs.phone_number,
          gender: postUserArgs.gender,
          password: postUserArgs.password,
          born_at: postUserArgs.born_at || null,
          is_athlete: postUserArgs.is_athlete,
          is_organizer: postUserArgs.is_organizer,
          height: postUserArgs.height || null,
          strength: postUserArgs.strength || null,
          created_at: new Date(),
        })
        .returning('*')
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async age(
    @Root() user: UserReq,
    // @Info() info: GraphQLResolveInfo,
    // @Ctx() ctx: Context,
  ): Promise<number> {
    return Math.round(
      DateTime.fromJSDate(user.born_at).diff(
        DateTime.fromJSDate(new Date()),
        ['years'],
      ).years,
    );
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async organizedEvents(@Root() user: UserReq): Promise<Event[]> {
    const response = await knex
      .select(eventFields)
      .join(USER_EVENT, `${USER}.id`, `${USER_EVENT}.user_id`)
      .join(EVENT, `${USER_EVENT}.event_id`, `${EVENT}.id`)
      .where(`user_event.is_organizer`, false)
      .where(`user.id`, user.id)
      .from(USER);

    return response;
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async watchedEvents(@Root() user: UserReq): Promise<EventReq[]> {
    const response = await knex
      .select(eventFields)
      .join(USER_EVENT, `${USER}.id`, `${USER_EVENT}.user_id`)
      .join(EVENT, `${USER_EVENT}.event_id`, `${EVENT}.id`)
      .where(`user_event.is_watcher`, true)
      .where(`user.id`, user.id)
      .from(USER);

    return response;
  }
}
