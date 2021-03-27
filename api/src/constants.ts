const constants = {
  NODE_ENV: process.env.NODE_ENV,

  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USER: process.env.DB_USER,
  DB_DB_NAME: process.env.DB_DB_NAME,
  DB_HOST: process.env.DB_HOST,

  SESSION_SECRET: process.env.SESSION_SECRET,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
};

export default constants;
