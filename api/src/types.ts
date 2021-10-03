import { Request, Response } from 'express';
import Knex from 'knex';

export enum Constants {
  NODE_ENV = 'NODE_ENV',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_USER = 'DB_USER',
  DB_DB_NAME = 'DB_DB_NAME',
  DB_HOST = 'DB_HOST',
  SESSION_SECRET = 'SESSION_SECRET',
  REDIS_HOST = 'REDIS_HOST',
  REDIS_PORT = 'REDIS_PORT',
  NEW_RELIC_LICENSE_KEY = 'NEW_RELIC_LICENSE_KEY',

  /** Dev-only constants */
  FRONT_IP_HOST = 'FRONT_IP_HOST',
}

export interface Context {
  req: Request;
  res: Response;
  clientId: number;
  knex: Knex<any, unknown[]>;
}

export enum UserFields {
  ID = 'id',
  EMAIL = 'email',
  FULL_NAME = 'full_name',
  LANGUAGE = 'language',
  BIO = 'bio',
  PHONE_NUMBER = 'phone_number',
  GENDER = 'gender',
  PASSWORD = 'password',
  BORN_AT = 'born_at',
  CONFIRMED_AT = 'confirmed_at',
  CREATED_AT = 'created_at',
  IS_ATHLETE = 'is_athlete',
  IS_ORGANIZER = 'is_organizer',
  HEIGHT = 'height',
  STRENGTH = 'strength',
}

export const USER = 'user';
export const EVENT = 'event';
export const DOCUMENT = 'document';
export const NOTIFICATION = 'notification';

export const USER_EVENT = 'user_event';
export const USER_DOCUMENT = 'user_document';

export const NOTIFICATION_EVENT = 'notitifcation_event';
export const NOTIFICATION_USER = 'notification_user';
