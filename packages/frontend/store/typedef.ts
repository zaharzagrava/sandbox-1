import { SagaIterator } from '@redux-saga/types';

import { ClientsState } from './client';
import { RequestsState } from './request';
export interface AppState {
  clients: ClientsState;
  requests: RequestsState;
}

export type AppSaga<ReturnType = void> = SagaIterator<AppState>;

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}
