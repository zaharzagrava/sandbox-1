import { Request, Response } from "express";
import Knex from "knex";
import { User } from "./modules/user/model";

export enum Constants {
  NODE_ENV = "NODE_ENV",
  DB_PASSWORD = "DB_PASSWORD",
  DB_USER = "DB_USER",
  DB_DB_NAME = "DB_DB_NAME",
  DB_HOST = "DB_HOST",
  SESSION_SECRET = "SESSION_SECRET",
  REDIS_HOST = "REDIS_HOST",
  REDIS_PORT = "REDIS_PORT",
  NEW_RELIC_LICENSE_KEY = "NEW_RELIC_LICENSE_KEY",

  /** Dev-only constants */
  FRONT_IP_HOST = "FRONT_IP_HOST",
}

declare module "express-session" {
  // eslint-disable-next-line
  interface SessionData {
    userId: string;
  }
}

export interface Context {
  req: Request;
  res: Response;
  sessionUser?: User;
}

export enum UserFields {
  ID = "id",
  EMAIL = "email",
  FULL_NAME = "full_name",
  LANGUAGE = "language",
  BIO = "bio",
  PHONE_NUMBER = "phone_number",
  GENDER = "gender",
  PASSWORD = "password",
  BORN_AT = "born_at",
  CONFIRMED_AT = "confirmed_at",
  CREATED_AT = "created_at",
  IS_ATHLETE = "is_athlete",
  IS_ORGANIZER = "is_organizer",
  HEIGHT = "height",
  STRENGTH = "strength",
}

export enum DBTable {
  USER = "user",
  EVENT = "event",
  DOCUMENT = "document",
  NOTIFICATION = "notification",
  USER_EVENT = "user_event",
  USER_DOCUMENT = "user_document",
  NOTIFICATION_EVENT = "notitifcation_event",
  NOTIFICATION_USER = "notification_user",
}

export const SID = "sid";
