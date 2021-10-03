import bcrypt from "bcrypt";
import { DBTable } from "../types";

export const { compareSync } = bcrypt;
export const { hashSync } = bcrypt;

export const eventFields = [
  `${DBTable.EVENT}.id`,
  `${DBTable.EVENT}.name`,
  `${DBTable.EVENT}.description`,
  `${DBTable.EVENT}.scheduled_at`,
  `${DBTable.EVENT}.created_at`,
];

export const userFields = [
  `${DBTable.USER}.id`,
  `${DBTable.USER}.email`,
  `${DBTable.USER}.full_name`,
  `${DBTable.USER}.language`,
  `${DBTable.USER}.bio`,
  `${DBTable.USER}.phone_number`,
  `${DBTable.USER}.gender`,
  `${DBTable.USER}.password`,
  `${DBTable.USER}.born_at`,
  `${DBTable.USER}.confirmed_at`,
  `${DBTable.USER}.created_at`,
  `${DBTable.USER}.created_at`,
  `${DBTable.USER}.is_athlete`,
  `${DBTable.USER}.is_organizer`,
];
