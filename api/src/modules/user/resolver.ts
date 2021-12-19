import {
  Args,
  Ctx,
  FieldResolver,
  Info,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { compare } from "bcrypt";
import {
  ErrorCodes,
  Errors,
  KnexErrorType,
  processKnexError,
} from "../../error";
import { eventFields } from "../../utils";
import { knex } from "../../knex";
import { Context, DBTable } from "../../types";

import { errorWrapper } from "../../middleware";

import { User, UserReq } from "./model";
import {
  DeleteUserArgs,
  GetUserArgs,
  PostUserArgs,
  PutUserArgs,
  PutUserFields,
  LoginUserArgs,
} from "./args-types";
import { Event, EventReq } from "../event/model";

@Resolver(User)
export class UserResolver {
  @UseMiddleware(errorWrapper)
  @Mutation(() => User)
  async loginUser(
    @Args() loginEnduser: LoginUserArgs,
    @Ctx() ctx: Context
  ): Promise<UserReq | null> {
    const enduser = ((
      await knex
        .select("*")
        .where("email", loginEnduser.email)
        .from(DBTable.USER)
    )[0] as unknown) as UserReq;

    if (!enduser) throw new Errors([ErrorCodes.USER_INCORRECT_EMAIL]);

    if (!(await compare(loginEnduser.password, enduser.password)))
      throw new Errors([ErrorCodes.USER_INCORRECT_PASSWORD]);

    ctx.req.session.userId = enduser.id;

    return enduser;
  }

  @UseMiddleware(errorWrapper)
  @Query(() => User)
  async getUser(
    @Args() getUserArgs: GetUserArgs,
    @Info() info: GraphQLResolveInfo
  ): Promise<UserReq> {
    return (
      await knex
        .select("*")
        .from(DBTable.USER)
        .whereRaw("id = ?", [getUserArgs.id])
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => User)
  async postUser(
    @Args() postUserArgs: PostUserArgs,
    @Ctx() ctx: Context
  ): Promise<UserReq> {
    let newEnduser = null;

    try {
      [newEnduser] = await knex(DBTable.USER)
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
        .returning("*");
    } catch (error) {
      processKnexError(error, {
        [KnexErrorType.EMAIL_TAKEN]: ErrorCodes.USER_EMAIL_TAKEN,
      });

      throw error;
    }

    ctx.req.session.userId = newEnduser.id;

    return newEnduser;
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => User)
  async putUser(@Args() putUserArgs: PutUserArgs): Promise<UserReq> {
    let updatedUser = null;

    const updateUser: PutUserFields = {};
    for (const [key, value] of Object.entries(putUserArgs.fields))
      if (value !== undefined) updateUser[key as keyof PutUserFields] = value;

    try {
      [updatedUser] = await knex<UserReq>(DBTable.USER)
        .update(updateUser)
        .where("id", putUserArgs.id)
        .returning("*");
    } catch (error) {
      processKnexError(error, {
        [KnexErrorType.EMAIL_TAKEN]: ErrorCodes.USER_EMAIL_TAKEN,
      });

      throw error;
    }

    return updatedUser;
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Boolean)
  async deleteUser(@Args() deleteUserArgs: DeleteUserArgs): Promise<Boolean> {
    const user = (await knex
      .delete("*")
      .where("id", deleteUserArgs.id)
      .from(DBTable.USER)) as User[];

    if (user.length === 0) throw new Errors([ErrorCodes.USER_NOT_FOUND]);

    return true;
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async age(
    @Root() user: UserReq
    // @Info() info: GraphQLResolveInfo,
    // @Ctx() ctx: Context,
  ): Promise<number> {
    return Math.round(
      DateTime.fromJSDate(user.born_at).diff(DateTime.fromJSDate(new Date()), [
        "years",
      ]).years
    );
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async organizedEvents(@Root() user: UserReq): Promise<Event[]> {
    const response = await knex
      .select(eventFields)
      .join(
        DBTable.USER_EVENT,
        `${DBTable.USER}.id`,
        `${DBTable.USER_EVENT}.user_id`
      )
      .join(
        DBTable.EVENT,
        `${DBTable.USER_EVENT}.event_id`,
        `${DBTable.EVENT}.id`
      )
      .where(`user_event.is_organizer`, false)
      .where(`user.id`, user.id)
      .from(DBTable.USER);

    return response;
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async watchedEvents(@Root() user: UserReq): Promise<EventReq[]> {
    const response = await knex
      .select(eventFields)
      .join(
        DBTable.USER_EVENT,
        `${DBTable.USER}.id`,
        `${DBTable.USER_EVENT}.user_id`
      )
      .join(
        DBTable.EVENT,
        `${DBTable.USER_EVENT}.event_id`,
        `${DBTable.EVENT}.id`
      )
      .where(`user_event.is_watcher`, true)
      .where(`user.id`, user.id)
      .from(DBTable.USER);

    return response;
  }
}
