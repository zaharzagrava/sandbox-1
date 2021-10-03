import { Constants } from './types';

const constants = {
  NODE_ENV: process.env.NODE_ENV,

  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USER: process.env.DB_USER,
  DB_DB_NAME: process.env.DB_DB_NAME,
  DB_HOST: process.env.DB_HOST,

  SESSION_SECRET: process.env.SESSION_SECRET,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};

const devOnlyConstants = [Constants.FRONT_IP_HOST];
const prodOnlyConstants: Constants[] = [];

const unpermittedDevEnvs = [];
const unpermittedProdEnvs = [];
const undefinedEnvs: string[] = [];

for (const [key, constant] of Object.entries(constants)) {
  if (
    devOnlyConstants.includes(key as Constants) &&
    constants.NODE_ENV !== 'development'
  ) {
    unpermittedDevEnvs.push(key);
    continue;
  }
  if (
    prodOnlyConstants.includes(key as Constants) &&
    constants.NODE_ENV !== 'production'
  ) {
    unpermittedProdEnvs.push(key);
    continue;
  }

  if (constant === undefined) undefinedEnvs.push(key);
}

if (unpermittedDevEnvs.length !== 0) {
  throw new Error(
    `There are unpermittedDevEnvs: ${JSON.stringify(
      unpermittedDevEnvs,
      null,
      2,
    )}`,
  );
}
if (unpermittedProdEnvs.length !== 0) {
  throw new Error(
    `There are unpermittedProdEnvs: ${JSON.stringify(
      unpermittedProdEnvs,
      null,
      2,
    )}`,
  );
}

if (undefinedEnvs.length !== 0) {
  throw new Error(
    `There are undefined envs: ${JSON.stringify(
      undefinedEnvs,
      null,
      2,
    )}`,
  );
}

export default constants;
