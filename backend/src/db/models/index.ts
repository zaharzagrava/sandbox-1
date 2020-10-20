import fs from 'fs';
import { forOwn } from 'lodash';
import path from 'path';
import { Model, Sequelize } from 'sequelize';
import { ClientDTO, CreateClientDTO } from 'src/interfaces';
import Client from './Client';

// allowNull: false
// type: DataTypes.BIGINT

const sequelizeConfig = require('../../../config/sequelize.config');

const sequelize = new Sequelize(sequelizeConfig);

const models = {
  Client: Client.initModel(sequelize),
};

Object.keys(models).forEach((modelName: any) => {
  // @ts-ignore
  if (models[modelName].associate) {
    // @ts-ignore
    models[modelName].associate(models);
  }
});

const db = {
  ...models,
  sequelize,
  Sequelize,
};

export default db;
