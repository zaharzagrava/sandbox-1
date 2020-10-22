import { SagaIterator } from '@redux-saga/types';

import { State as UsersState } from './Users/reducer';

export interface AppState {
  users: UsersState;
}

export type AppSaga<ReturnType = void> = SagaIterator<AppState>;

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}
