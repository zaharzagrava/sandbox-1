import { takeLatest, call, put } from 'redux-saga/effects';

import { api } from '../../services/api';
import { postsConstants, postsActions } from '.';
import { requestManager } from '../../services/api/request-manager';

function* fetch(payload: any) {
  try {
    const response = yield call(api.posts.get, payload.id);

    // @ts-ignore
    yield put(postsActions.getPostSuccess(response.post));
  } catch (error) {
    // @ts-ignore
    yield put(postsActions.getPostFailure(error.response.data));
  }
}

function* fetchAll(payload: any) {
  try {
    const response = yield call(api.posts.getAll, payload.params);

    // @ts-ignore
    yield put(postsActions.getPostsSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(postsActions.getPostFailured(error.response.data));
  }
}

function* create(payload: any) {
  try {
    const response = yield call(() => {
      return requestManager.post('posts', { data: payload.post, headers: { 'content-type': 'multipart/form-data' } });
    });

    // @ts-ignore
    yield put(postsActions.createPostSuccess(response.data));
    // yield put(postsActions.getPosts())
  } catch (error) {
    // @ts-ignore
    yield put(postsActions.createPostFailure(error.response.data));
  }
}

function* update(payload: any) {
  try {
    const response = yield call(api.posts.update, payload.id, payload.post);

    // @ts-ignore
    yield put(postsActions.updatePostSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(postsActions.updatePostFailure(error.response.data));
  }
}

function* destroy(payload: any) {
  try {
    const response = yield call(api.posts.destroy, payload.id);

    // @ts-ignore
    yield put(postsActions.destroyPostSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(postsActions.destroyPostFailure(error.response.data));
  }
}

export function* postsSaga() {
  yield takeLatest(postsConstants.GET_POST_REQUEST, fetch);
  yield takeLatest(postsConstants.GET_POSTS_REQUEST, fetchAll);
  yield takeLatest(postsConstants.CREATE_POST_REQUEST, create);
  yield takeLatest(postsConstants.UPDATE_POST_REQUEST, update);
  yield takeLatest(postsConstants.DESTROY_POST_REQUEST, destroy);
}
