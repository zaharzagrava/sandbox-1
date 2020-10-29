import { SagaIterator } from '@redux-saga/types';

import { State as UsersState } from './Users/reducer';
import { State as SessionState } from './Session/reducer';
import { State as PostsState } from './Posts/reducer';
import { State as CommentsState } from './Comments/reducer';

export interface AppState {
  users: UsersState;
  posts: PostsState;
  comments: CommentsState;
  session: SessionState;
}

export type AppSaga<ReturnType = void> = SagaIterator<AppState>;

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}
