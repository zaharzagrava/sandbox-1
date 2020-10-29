import { takeLatest, call, put, select } from 'redux-saga/effects';

import { api } from '../../services/api';
import { commentsConstants, commentsActions } from '.';
import { postsActions } from '../Posts';
import _ from 'lodash';

function* fetch(payload: any) {
  try {
    const response = yield call(api.comments.get, payload.id);

    // @ts-ignore
    yield put(commentsActions.getCommentSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(commentsActions.getCommentFailure(error.response.data));
  }
}

function* fetchAll() {
  try {
    const response = yield call(api.comments.getAll);

    // @ts-ignore
    yield put(commentsActions.getCommentsSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(commentsActions.getCommentFailured(error.response.data));
  }
}

function* create(payload: any) {
  try {
    const response = yield call(
      api.comments.create,
      payload.comment,
      payload.post_id
    );

    // @ts-ignore
    yield put(commentsActions.createCommentSuccess(response.data));
    console.log('1');
    let post = yield select((state) => state.posts.post);
    let posts = yield select((state) => state.posts.posts);
    console.log('2');

    if (post) {
      if (post.id === payload.post_id) {
        const newPost = _.cloneDeep(post);
        newPost.comments.push(response.data);
        yield put(postsActions.getPostSuccess(newPost));
      }
    }
    console.log('3');

    if (posts) {
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        if (post.id === payload.post_id) {
          const newPosts = _.cloneDeep(posts);
          newPosts[i].comments.push(response.data);
          yield put(postsActions.getPostsSuccess(newPosts));
          break;
        }
      }
    }
  } catch (error) {
    console.error(error);

    // @ts-ignore
    // yield put(commentsActions.createCommentFailure(error.response.data));
  }
}

function* update(payload: any) {
  try {
    const response = yield call(
      api.comments.update,
      payload.id,
      payload.comment
    );

    // @ts-ignore
    yield put(commentsActions.updateCommentSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(commentsActions.updateCommentFailure(error.response.data));
  }
}

function* destroy(payload: any) {
  try {
    const response = yield call(api.comments.destroy, payload.id);

    // @ts-ignore
    yield put(commentsActions.destroyCommentSuccess(response.data));
  } catch (error) {
    // @ts-ignore
    yield put(commentsActions.destroyCommentFailure(error.response.data));
  }
}

export function* commentsSaga() {
  yield takeLatest(commentsConstants.GET_COMMENT_REQUEST, fetch);
  yield takeLatest(commentsConstants.GET_COMMENTS_REQUEST, fetchAll);
  yield takeLatest(commentsConstants.CREATE_COMMENT_REQUEST, create);
  yield takeLatest(commentsConstants.UPDATE_COMMENT_REQUEST, update);
  yield takeLatest(commentsConstants.DESTROY_COMMENT_REQUEST, destroy);
}
