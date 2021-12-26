import { MiddlewareFn } from "type-graphql";
import { Context, DBTable, SID } from "./types";
import { knex } from "./knex";
import { User } from "./modules/user/model";
import { ErrorCodes, Errors } from "./error";

export const errorWrapper: MiddlewareFn<Context> = async (args, next) => {
  try {
    // Initiate session data if authorized
    let sessionUser: User | null = null;
    if (args.context.req.session.userId) {
      sessionUser = ((
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

    // Authentication stuff
    if (
      [
        // DocumentResolver
        "getDocument",
        "postDocument",
        "putDocument",
        "deleteDocument",
        "author",
        "event",
        // EventResolver
        // "getAllEvents",
        // "getLatestEvents",
        // "getEvent",
        "postEvent",
        "putEvent",
        "deleteEvent",
        "organizer",
        // UserResolver
        "getUser",
        // "loginUser",
        // "logoutUser",
        "postUser",
        // "confirmUser",
        "putUser",
      ].includes(args.info.fieldName)
    ) {
      console.log("@is organizer check");
      if (
        !(sessionUser && sessionUser.is_organizer && sessionUser.confirmed_at)
      ) {
        return new Errors([
          ErrorCodes.DOCUMENT_ACCESS_UNAUTHENTICATED,
          ErrorCodes.USER_ACCESS_UNAUTHENTICATED,
        ]);
      }
    } else if (
      [
        // NotificationResolver
        "getNotification",
        "postNotification",
        "putNotification",
        "deleteNotification",
        "notifications",
        // UserResolver
        "getMe",
        "deleteUser",
        "age",
        "organizedEvents",
        "watchedEvents",
      ].includes(args.info.fieldName)
    ) {
      console.log("@is logged in check");
      if (!sessionUser) {
        return new Errors([ErrorCodes.NOTIFICAION_ACCESS_UNAUTHENTICATED]);
      }
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
