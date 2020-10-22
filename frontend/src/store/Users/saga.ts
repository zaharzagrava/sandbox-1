import { takeLatest, call, put } from 'redux-saga/effects';

import { api } from '../../services/api';
import { usersConstants, usersActions } from '.';

function* fetch(payload: any) {
  try {
    const response = yield call(api.users.get, payload.id);

    // @ts-ignore
    yield put(usersActions.getUserSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.getUserFailed(error.response.data));
  }
}

function* create(payload: any) {
  try {
    const response = yield call(api.users.create, payload.params);

    // @ts-ignore
    yield put(usersActions.createUserSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.createUserFailed(error.response.data));
  }
}

function* update(payload: any) {
  try {
    const response = yield call(api.users.update, payload.params);

    // @ts-ignore
    yield put(usersActions.updateUserSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.updateUserFailed(error.response.data));
  }
}

function* destroy() {
  try {
    const response = yield call(api.users.destroy);

    // @ts-ignore
    yield put(usersActions.destroyUserSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.destroyUserFailed(error.response.data));
  }
}

export function* usersSaga() {
  yield takeLatest(usersConstants.GET_USER_REQUEST, fetch);
  yield takeLatest(usersConstants.CREATE_USER_REQUEST, create);
  yield takeLatest(usersConstants.UPDATE_USER_REQUEST, update);
  yield takeLatest(usersConstants.DESTROY_USER_REQUEST, destroy);
}
