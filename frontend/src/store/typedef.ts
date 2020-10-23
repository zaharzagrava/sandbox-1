import { SagaIterator } from '@redux-saga/types';

import { State as UsersState } from './Users/reducer';
import { State as SessionState } from './Session/reducer';

export interface AppState {
  users: UsersState;
  session: SessionState;
}

export type AppSaga<ReturnType = void> = SagaIterator<AppState>;

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}
