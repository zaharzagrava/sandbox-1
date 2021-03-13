import knexModule from 'knex';
import constants from './constants';

export const knex = knexModule({
  client: 'pg',
  connection: {
    host: constants.DB_HOST,
    user: constants.DB_USER,
    password: constants.DB_PASSWORD,
    database: constants.DB_DB_NAME,
  },
});
