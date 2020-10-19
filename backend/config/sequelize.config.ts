import { databaseConfig, DatabaseConfig } from './database.config';

export default databaseConfig[
  (process.env.NODE_ENV as keyof DatabaseConfig) || 'development'
];
