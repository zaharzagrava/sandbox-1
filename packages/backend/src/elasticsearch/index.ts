import { Client } from '@elastic/elasticsearch';
import constants from '../constants';

export const ESClient = new Client({
  node: constants.ELASTICSEARCH_NODE
});
