// Update with your config settings.

import constants from './src/constants';

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'sandbox_1_dev',
      user: constants.DB_USER,
      host: constants.DB_HOST,
      password: constants.DB_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
  },
};
