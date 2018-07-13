import sequelize from 'feathers-sequelize';
import Sequelize from 'sequelize';

/**
 * Creates a Sequelize database model for storing a built SDK.
 *
 * @param dbConnection The Sequelize connection to create the model for.
 * @returns The created Sequelize model.
 */
export const createSdkModel = (dbConnection: Sequelize.Sequelize) =>
  dbConnection.define(
    'sdks',
    {
      planId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    },
  );

/**
 * Creates a Feathers service to access SDKs, using the given database model.
 *
 * @param sdkModel The database model representing an SDK.
 * @returns The created Feathers service.
 */
export const createSdkService = sdkModel => {
  const service = sequelize({
    Model: sdkModel,
  });
  service.docs = {
    description: 'The SDKs generated by Swagger/OpenAPI specs',
    definitions: {
      sdks: {
        type: 'object',
        properties: {
          planId: {
            type: 'integer',
            format: 'int64',
            description: 'ID of the plan to generate the SDK for',
          },
        },
        additionalProperties: true,
      },
      'sdks list': {
        type: 'array',
      },
    },
  };
  return service;
};
