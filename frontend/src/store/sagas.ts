import { all } from 'redux-saga/effects';

import { sessionSaga } from './Session';
import { usersSaga } from './Users';

export default function* () {
  yield all([usersSaga(), sessionSaga()]);
}
