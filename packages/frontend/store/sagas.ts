import { put, call, takeLatest } from 'redux-saga/effects';

import backend from '../backend';
import { RequestActionCreators, RequestConstants, GetClientMyselfAction } from './request';
import { ClientActionCreators } from './client';

function* getClientMyself(action: GetClientMyselfAction) {
  try {
    const getClientMyself = yield call(backend.getClientMyself, action.payload.getClientMyself);

    yield put(RequestActionCreators.getClientMyself('success'));
    yield put(ClientActionCreators.insertClient(getClientMyself));
  } catch (error) {
    yield put(RequestActionCreators.getClientMyself('failure'));
  }
}

export default function* requestSaga() {
  yield takeLatest(RequestConstants.GET_CLIENT_MYSELF, getClientMyself);
}
