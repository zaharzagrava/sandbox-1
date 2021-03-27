import bcrypt from 'bcrypt';
import { EVENT, USER } from '../types';

export const { compareSync } = bcrypt;
export const { hashSync } = bcrypt;

export const eventFields = [
  `${EVENT}.id`,
  `${EVENT}.name`,
  `${EVENT}.description`,
  `${EVENT}.scheduled_at`,
  `${EVENT}.created_at`,
];

export const userFields = [
  `${USER}.id`,
  `${USER}.email`,
  `${USER}.full_name`,
  `${USER}.language`,
  `${USER}.bio`,
  `${USER}.phone_number`,
  `${USER}.gender`,
  `${USER}.password`,
  `${USER}.born_at`,
  `${USER}.confirmed_at`,
  `${USER}.created_at`,
  `${USER}.created_at`,
  `${USER}.is_athlete`,
  `${USER}.is_organizer`,
];
