import { Op, Options } from 'sequelize';

export type DatabaseConfig = {
  development: Options;
  test: Options;
  production: Options;
};

const commonConfig: Options = {
  username: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
  operatorsAliases: Op,
};

export const databaseConfig: DatabaseConfig = {
  development: {
    ...commonConfig,
    database: 'instagram-like-app_development',
  },
  test: {
    ...commonConfig,
    database: 'instagram-like-app_test',
  },
  production: {
    ...commonConfig,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME_PRODUCTION,
  },
};
