import { takeLatest, call, put } from 'redux-saga/effects';

import { api } from '../../services/api';
import { sessionConstants, sessionActions } from '.';

function* getSession(payload: any) {
  try {
    // yield new Promise((res) => setTimeout(res, 1000));

    const response = yield call(api.session.get);

    // @ts-ignore
    yield put(sessionActions.getSessionSuccess(response.data));
  } catch (error) {
    console.log('@error');
    console.log(error);
    // @ts-ignore
    yield put(sessionActions.getSessionFailure(error.response.data));
  }
}

function* createSession(payload: any) {
  try {
    const response = yield call(api.session.create, payload.loginData);

    // @ts-ignore
    yield put(sessionActions.createSessionSuccess(response.data));
    yield put(sessionActions.getSessionSuccess(response.data));
  } catch (error) {
    console.log('@error');
    console.log(error);
    // @ts-ignore
    yield put(sessionActions.createSessionFailure(error.response.data));
  }
}

function* destroySession() {
  try {
    const response = yield call(api.session.destroy);

    // @ts-ignore
    yield put(sessionActions.destroySessionSuccess());
  } catch (error) {
    // @ts-ignore
    yield put(sessionActions.destroySessioFailure(error.response.data));
  }
}

export function* sessionSaga() {
  yield takeLatest(sessionConstants.GET_SESSION_REQUEST, getSession);
  yield takeLatest(sessionConstants.CREATE_SESSION_REQUEST, createSession);
  yield takeLatest(sessionConstants.DESTROY_SESSION_REQUEST, destroySession);
}
