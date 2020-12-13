import { put, call, takeLatest } from 'redux-saga/effects';

import backend from '../backend';
import { GetClientMyselfProcessing, GET_CLIENT_MYSELF } from './request';
import { AppAction } from './typedef';

function* getClientMyself(action: GetClientMyselfProcessing) {
  try {
    console.log('@beefore');
    const getClientMyself = yield call(backend.getClientMyself, action.payload.getClientMyself);

    console.log('@getClientMyself');
    console.log(getClientMyself);

    yield put<AppAction>({
      type: 'GET_CLIENT_MYSELF_SUCCESS',
      payload: {
        requestInfo: {
          status: 'success'
        }
      }
    });
    yield put<AppAction>({
      type: 'LOAD_CLIENT',
      payload: {
        clients: [getClientMyself.data.getClient],
        featuresInfo: {
          get_client_myself: true
        }
      }
    });
  } catch (error) {
    yield put<AppAction>({
      type: 'GET_CLIENT_MYSELF_FAILURE',
      payload: {
        requestInfo: {
          status: 'error'
        }
      }
    });
  }
}

export default function* requestSaga() {
  yield takeLatest(GET_CLIENT_MYSELF, getClientMyself);
}
