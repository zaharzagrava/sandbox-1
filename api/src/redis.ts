import redisModule from "ioredis";
import constants from "./constants";

export const redis = new redisModule({
  host: constants.REDIS_HOST,
  port: constants.REDIS_PORT,
});
