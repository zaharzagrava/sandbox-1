import { all } from 'redux-saga/effects';

import { sessionSaga } from './Session';
import { usersSaga } from './Users';
import { postsSaga } from './Posts';
import { commentsSaga } from './Comments';

export default function* () {
  yield all([usersSaga(), sessionSaga(), postsSaga(), commentsSaga()]);
}
