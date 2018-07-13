import sequelize from 'feathers-sequelize';
import Sequelize from 'sequelize';

/**
 * Creates a Sequelize database model for storing a plan.
 *
 * @param dbConnection The Sequelize connection to create the model for.
 * @returns The created Sequelize model.
 */
export const createPlanModel = (dbConnection: Sequelize.Sequelize) =>
  dbConnection.define(
    'plans',
    {
      target: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      options: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      buildStatus: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      specId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    },
  );

/**
 * Creates a Feathers service to access plans, using the given database model.
 *
 * @param planModel The database model representing a plan.
 * @returns The created Feathers service.
 */
export const createPlanService = planModel => {
  const service = sequelize({
    Model: planModel,
  });
  service.docs = {
    description: 'The plans used for generating SDKs according to a given specification',
    definitions: {
      plans: {
        type: 'object',
        properties: {
          specId: {
            type: 'integer',
            format: 'int64',
            description: 'ID of the specification associated with the plan',
          },
        },
        additionalProperties: true,
      },
      'plans list': {
        type: 'array',
      },
    },
  };
  return service;
};
