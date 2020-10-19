import { Sequelize } from 'sequelize';

/* Check whether env variables are provided */
if (process.env.DATABASE_URL === undefined)
  throw new Error('process.env.DATABASE_URL === undefined');

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  ssl: true,
});
