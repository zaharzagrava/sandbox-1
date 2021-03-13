import winston, { format } from 'winston';
import newrelicFormatter from '@newrelic/winston-enricher';
import got from 'got';
import constants from './constants';
import { promises as fs } from 'fs';
import { DateTime } from 'luxon';

setInterval(async () => {
  try {
    const logFile = await fs.readFile('./combined.log');
    const logs = logFile
        .toString()
        .split('\n')
        .filter((log) => log !== '')
        .map((log) => JSON.parse(log));

    await got.post('https://log-api.eu.newrelic.com/log/v1', {
      headers: {
        'X-License-Key': constants.NEW_RELIC_LICENSE_KEY,
      },
      json: [{ logs }],
    });

    await fs.writeFile('./combined.log', '');
  } catch (error) {
    console.log('Error');
    console.log(JSON.stringify(error, null, 2));
  }
}, 30000);

export const l = winston.createLogger({
  level: 'info',
  format: winston.format.combine(newrelicFormatter()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: format.combine(
          format.colorize(),
          format.printf(
              (info) =>
                `${DateTime.fromJSDate(new Date(info.timestamp)).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)} ${
                  info.level
                }: ${info.message}`,
          ),
      ),
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
