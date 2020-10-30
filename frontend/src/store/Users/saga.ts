import { takeLatest, call, put } from 'redux-saga/effects';

import { api } from '../../services/api';
import { usersConstants, usersActions } from '.';
import { sessionActions } from '../Session';

function* fetch(payload: any) {
  try {
    const response = yield call(api.users.get, payload.id);

    // @ts-ignore
    yield put(usersActions.getUserSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.getUserFailure(error.response.data));
  }
}

function* fetchAll(payload: any) {
  try {
    const response = yield call(api.users.getAll);

    // @ts-ignore
    yield put(usersActions.getUsersSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.getUserFailured(error.response.data));
  }
}

function* create(payload: any) {
  try {
    const response = yield call(api.users.create, payload.user);

    // @ts-ignore
    yield put(usersActions.createUserSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.createUserFailure(error.response.data));
  }
}

function* update(payload: any) {
  try {
    const response = yield call(api.users.update, payload.user);

    // @ts-ignore
    yield put(usersActions.updateUserSuccess(response.data));
    yield put(sessionActions.getSessionSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.updateUserFailure(error.response.data));
  }
}

function* updatePassword(payload: any) {
  try {
    const response = yield call(api.users.updatePassword, payload.passwords);

    // @ts-ignore
    yield put(usersActions.updateUserPasswordSuccess());
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.updateUserPasswordFailure(error.response.data));
  }
}

function* destroy() {
  try {
    const response = yield call(api.users.destroy);

    // @ts-ignore
    yield put(usersActions.destroyUserSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(usersActions.destroyUserFailure(error.response.data));
  }
}

export function* usersSaga() {
  yield takeLatest(usersConstants.GET_USER_REQUEST, fetch);
  yield takeLatest(usersConstants.GET_USERS_REQUEST, fetchAll);
  yield takeLatest(usersConstants.CREATE_USER_REQUEST, create);
  yield takeLatest(usersConstants.UPDATE_USER_REQUEST, update);
  yield takeLatest(usersConstants.UPDATE_USER_PASSWORD_REQUEST, updatePassword);
  yield takeLatest(usersConstants.DESTROY_USER_REQUEST, destroy);
}
