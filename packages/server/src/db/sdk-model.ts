import sequelize from 'feathers-sequelize';
import Sequelize from 'sequelize';

/**
 * Creates a Sequelize database model for storing a built SDK.
 *
 * @param dbConnection The Sequelize connection to create the model for.
 * @returns The created Sequelize model.
 */
export function createSdkModel(dbConnection: Sequelize.Sequelize) {
  return dbConnection.define(
    'sdks',
    {
      sdkConfigId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buildStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buildError: {
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    {
      freezeTableName: true,
    },
  );
}

/**
 * Creates a Feathers service to access SDKs, using the given database model.
 *
 * @param sdkModel The database model representing an SDK.
 * @returns The created Feathers service.
 */
export function createSdkService(sdkModel) {
  const service = sequelize({
    Model: sdkModel,
  });
  service.docs = {
    description: 'The SDKs generated by OpenAPI specifications',
    definitions: {
      sdks: {
        type: 'object',
        properties: {
          sdkConfigId: {
            type: 'integer',
            format: 'int64',
            description: 'ID of the SDK configuration to generate the SDK for',
          },
          path: {
            type: 'string',
            description: 'URL from where the SDK can be downloaded from',
          },
          buildStatus: {
            type: 'string',
            description: 'The status of this specific SDK build',
          },
          buildError: {
            type: 'string',
            description: 'Error message if the build of this SDK failed'
          }
        },
        additionalProperties: true,
      },
      'sdks list': {
        type: 'array',
        items: {
          $ref: '#definitions/sdks',
        },
      },
    },
  };
  return service;
}
