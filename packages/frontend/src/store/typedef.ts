import { SagaIterator } from '@redux-saga/types';

import { ClientAction, ClientsState } from './client';
import { RequestAction, RequestsState } from './request';

export type AppAction = ClientAction | RequestAction;

export interface AppState {
  clients: ClientsState;
  requests: RequestsState;
}

export type AppSaga = SagaIterator<AppState>;

/* Rewriting react-redux types to add typings to the project */
declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
  export function useDispatch(): (action: AppAction) => AppAction;
}
