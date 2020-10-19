import { databaseConfig, DatabaseConfig } from './database.config';

module.exports =
  databaseConfig[
    (process.env.NODE_ENV as keyof DatabaseConfig) || 'development'
  ];
