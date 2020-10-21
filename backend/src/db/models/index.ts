import { DataTypes, Sequelize } from 'sequelize';

const sequelizeConfig = require('../../../config/sequelize.config');

const sequelize = new Sequelize(sequelizeConfig);

export default sequelize;

// Tables (models) first
export { Client } from './Client';
export { Comment } from './Comment';
export { Hashtag } from './Hashtag';
export { Post } from './Post';
export { Tag } from './Tag';

// Junciton tables (models) second
export { HashtagTextsource } from './HashtagTextsource';
export { TagTextsource } from './TagTextsource';
export { ClientPost } from './ClientPost';
export { ClientComment } from './ClientComment';
