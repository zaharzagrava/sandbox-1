import { all } from 'redux-saga/effects';

import { usersSaga } from './Users';

export default function* () {
  yield all([usersSaga()]);
}
