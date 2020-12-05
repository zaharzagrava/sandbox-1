import knex from 'knex';
import constants from '../constants';

if (constants.NODE_ENV !== 'development') throw new Error('Production is not ready yet');

export const knexConnection = knex({
  client: 'pg',
  connection: 'postgresql://postgres:werwer@db:5432/sandbox_1_dev'
});
