import produce from 'immer';

import { ClientDTO, FeaturesInfo } from '../types';

/* State */
export interface ClientsState {
  clients: {
    [key: string]: ClientDTO & FeaturesInfo;
  };
}

/* Initial State */
const initialState = {
  clients: {}
};

/* Reducer */
export const ClientReducer = produce((draft: ClientsState, action: ClientAction) => {
  switch (action.type) {
    case LOAD_CLIENT:
      action.payload.clients.forEach(loadClient => {
        for (const key in loadClient) {
          if (Object.prototype.hasOwnProperty.call(loadClient, key)) {
            if (draft.clients[loadClient.id] === undefined) draft.clients[loadClient.id] = { id: loadClient.id };
            draft.clients[loadClient.id][key] = loadClient[key];
          }
        }
      });
      return;

    case CLEAR_CLIENT:
      action.payload.clientIds.forEach(loadClientId => {
        delete draft.clients[loadClientId];
      });

      return;
    default:
      return;
  }
}, initialState);

/* Action Types */
export const LOAD_CLIENT = 'LOAD_CLIENT';
export const CLEAR_CLIENT = 'CLEAR_CLIENT';

/* Actions */
interface InsertClient {
  type: typeof LOAD_CLIENT;
  payload: { clients: ClientDTO[]; featuresInfo: FeaturesInfo };
}

interface ClearClient {
  type: typeof CLEAR_CLIENT;
  payload: { clientIds: string[] };
}

export type ClientAction = InsertClient | ClearClient;
