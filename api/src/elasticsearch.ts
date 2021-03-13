import { Client } from '@elastic/elasticsearch';
import constants from './constants';

export const es = new Client({
  node: constants.ELASTICSEARCH_NODE
});
