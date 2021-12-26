import winston, { format } from "winston";
import { DateTime } from "luxon";

export const l = winston.createLogger({
  level: "info",
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) =>
            `${DateTime.fromJSDate(new Date(info.timestamp)).toLocaleString(
              DateTime.DATETIME_SHORT_WITH_SECONDS
            )} ${info.level}: ${info.message}`
        )
      ),
    }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
