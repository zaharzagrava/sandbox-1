import produce from 'immer';

import { ClientDTO } from '../types';

/* State */
export interface ClientsState {
  clients: ClientDTO[];
}

/* Initial State */
const initialState = {
  clients: []
};

/* Reducer */
export const ClientReducer = produce((draft: ClientsState, action: RequestAction) => {
  switch (action.type) {
    case INSERT_CLIENT:
      draft.clients = action.payload;
      return;

    case CLEAR_CLIENT:
      draft.clients = [];
      return;

    default:
      return;
  }
}, initialState);

/* Action Types */
export const INSERT_CLIENT = 'INSERT_CLIENT';
export const CLEAR_CLIENT = 'CLEAR_CLIENT';

/* Actions */
interface InsertClient {
  type: typeof INSERT_CLIENT;
  payload: ClientDTO[];
}

interface ClearClient {
  type: typeof CLEAR_CLIENT;
  payload: ClientDTO[];
}

export type RequestAction = InsertClient | ClearClient;

/* Action Creators */
export const ClientActionCreators = {
  insertClient: function (clients: any) {
    return {
      type: INSERT_CLIENT,
      payload: clients
    };
  },
  clearClient: function (clients: any) {
    return {
      type: CLEAR_CLIENT,
      payload: clients
    };
  }
};
