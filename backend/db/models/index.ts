import fs from 'fs';
import { forOwn } from 'lodash';
import path from 'path';
import { Sequelize } from 'sequelize';

// allowNull: false
// type: DataTypes.BIGINT

import sequelizeConfig from '../../config/sequelize.config';

const sequelize = new Sequelize(sequelizeConfig);

const models = {
  Client: sequelize.import(path.join(__dirname, 'client.ts')),
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
