import { logger } from '@openapi-platform/logger';
import Sequelize from 'sequelize';
import { config } from '../config';

export async function connectToDb() {
  const databaseConfig = config.get('database');
  const dbConnection = new Sequelize(
    databaseConfig.name,
    databaseConfig.username,
    databaseConfig.password,
    {
      dialect: 'postgres',
      host: databaseConfig.host,
      port: databaseConfig.port,
      logging: logger.info,
    },
  );

  try {
    await dbConnection.authenticate();
    logger.info('Successfully connected to database');
  } catch (err) {
    logger.error('Unable to connect to database: %s', err);
    throw err;
  }
  return dbConnection;
}