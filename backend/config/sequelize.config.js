const { Op } = require("sequelize");

const commonConfig = {
  username: "postgres",
  password: "werwer",
  host: "db",
  port: 5432,
  dialect: "postgres",
  logging: console.log,
  operatorsAliases: Op,
};

const databaseConfig = {
  development: {
    ...commonConfig,
    database: "sandbox_1_dev",
    dialect: "postgres",
  },
  test: {
    ...commonConfig,
    database: "sandbox_1_test",
    dialect: "postgres",
  },
  production: {
    ...commonConfig,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME_PRODUCTION,
    dialect: "postgres",
  },
};

module.exports = databaseConfig[process.env.NODE_ENV || "development"];
