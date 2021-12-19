import { MiddlewareFn } from "type-graphql";
import _ from "lodash";
import { Context, DBTable, SID } from "./types";
import { knex } from "./knex";
import { User } from "./modules/user/model";
import { ErrorCodes, Errors } from "./error";

export const errorWrapper: MiddlewareFn<Context> = async (args, next) => {
  try {
    if (args.context.req.session.userId) {
      const sessionUser = ((
        await knex
          .select("*")
          .where("id", args.context.req.session.userId)
          .from(DBTable.USER)
      )[0] as unknown) as User;

      if (sessionUser) {
        args.context.sessionUser = sessionUser;
      }
    } else if (args.context.req.cookies.sid !== undefined) {
      // Clear cookie that is in client's browser but not inside redis
      args.context.res.clearCookie(SID);
    }

    return await next();
  } catch (error) {
    // eslint-disable-next-line
    console.log('=== error ===\n\n\n');
    // eslint-disable-next-line
    console.log(error);
    // eslint-disable-next-line
    console.log('===');
    // eslint-disable-next-line
    console.log(JSON.stringify(error, null, 2));
    // eslint-disable-next-line
    console.log('\n\n\n=== error ===');

    if (error instanceof Errors) {
      return error;
    }

    return new Errors([ErrorCodes.INTERNAL_SERVER_ERROR]);
  }
};
