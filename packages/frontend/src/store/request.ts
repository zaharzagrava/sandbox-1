import produce from 'immer';

import { GetClientMyselfArgs, RequestInfo as RequestInfo } from '../types';

/* State */
export interface RequestsState {
  get_session: RequestInfo[];
  post_session: RequestInfo[];
  delete_session: RequestInfo[];
  get_tables: RequestInfo[];
  get_client_myself: RequestInfo[];
  get_client_other: RequestInfo[];
  get_clients_followers: RequestInfo[];
  get_clients_close_friends: RequestInfo[];
  get_clients_interesting_people: RequestInfo[];
  get_clients_likers: RequestInfo[];
  post_client: RequestInfo[];
  put_client: RequestInfo[];
  delete_client: RequestInfo[];
  get_posts_main_feed: RequestInfo[];
  get_posts_bookmarked: RequestInfo[];
  post_post: RequestInfo[];
}

/* Initial State */
const initialState = {
  get_session: [],
  post_session: [],
  delete_session: [],
  get_tables: [],
  get_client_myself: [],
  get_client_other: [],
  get_clients_followers: [],
  get_clients_close_friends: [],
  get_clients_interesting_people: [],
  get_clients_likers: [],
  post_client: [],
  put_client: [],
  delete_client: [],
  get_posts_main_feed: [],
  get_posts_bookmarked: [],
  post_post: []
};

/* Reducer */
export const RequestReducer = produce((draft: RequestsState, action: RequestAction) => {
  switch (action.type) {
    case GET_CLIENT_MYSELF:
      draft.get_client_myself.push({
        status: action.payload.requestInfo.status
      });
      return;
    case GET_CLIENT_MYSELF_FAILURE:
      draft.get_client_myself[draft.get_client_myself.length - 1].status = action.payload.requestInfo.status;
      return;
    case GET_CLIENT_MYSELF_SUCCESS:
      draft.get_client_myself[draft.get_client_myself.length - 1].status = action.payload.requestInfo.status;
      return;
    default:
      return;
  }
}, initialState);

/* Action Types */
export const GET_SESSION = 'GET_SESSION';
export const GET_SESSION_SUCCESS = 'GET_SESSION_SUCCESS';
export const GET_SESSION_FAILURE = 'GET_SESSION_FAILURE';

export const POST_SESSION = 'POST_SESSION';
export const POST_SESSION_SUCCESS = 'POST_SESSION_SUCCESS';
export const POST_SESSION_FAILURE = 'POST_SESSION_FAILURE';

export const DELETE_SESSION = 'DELETE_SESSION';
export const DELETE_SESSION_SUCCESS = 'DELETE_SESSION_SUCCESS';
export const DELETE_SESSION_FAILURE = 'DELETE_SESSION_FAILURE';

export const GET_TABLES = 'GET_TABLES';
export const GET_TABLES_SUCCESS = 'GET_TABLES_SUCCESS_SUCCESS';
export const GET_TABLES_FAILURE = 'GET_TABLES_FAILURE';

export const GET_CLIENT_MYSELF = 'GET_CLIENT_MYSELF';
export const GET_CLIENT_MYSELF_SUCCESS = 'GET_CLIENT_MYSELF_SUCCESS';
export const GET_CLIENT_MYSELF_FAILURE = 'GET_CLIENT_MYSELF_FAILURE';

export const GET_CLIENT_OTHER = 'GET_CLIENT_OTHER';
export const GET_CLIENT_OTHER_SUCCESS = 'GET_CLIENT_OTHER_SUCCESS';
export const GET_CLIENT_OTHER_FAILURE = 'GET_CLIENT_OTHER_FAILURE';

export const GET_CLIENTS_FOLLOWERS = 'GET_CLIENTS_FOLLOWERS';
export const GET_CLIENTS_FOLLOWERS_SUCCESS = 'GET_CLIENTS_FOLLOWERS_SUCCESS';
export const GET_CLIENTS_FOLLOWERS_FAILURE = 'GET_CLIENTS_FOLLOWERS_FAILURE';

export const GET_CLIENTS_CLOSE_FRIENDS = 'GET_CLIENTS_CLOSE_FRIENDS';
export const GET_CLIENTS_CLOSE_FRIENDS_SUCCESS = 'GET_CLIENTS_CLOSE_FRIENDS_SUCCESS';
export const GET_CLIENTS_CLOSE_FRIENDS_FAILURE = 'GET_CLIENTS_CLOSE_FRIENDS_FAILURE';

export const GET_CLIENTS_INTERESTING_PEOPLE = 'GET_CLIENTS_INTERESTING_PEOPLE';
export const GET_CLIENTS_INTERESTING_PEOPLE_SUCCESS = 'GET_CLIENTS_INTERESTING_PEOPLE_SUCCESS';
export const GET_CLIENTS_INTERESTING_PEOPLE_FAILURE = 'GET_CLIENTS_INTERESTING_PEOPLE_FAILURE';

export const GET_CLIENTS_LIKERS = 'GET_CLIENTS_LIKERS';
export const GET_CLIENTS_LIKERS_SUCCESS = 'GET_CLIENTS_LIKERS_SUCCESS';
export const GET_CLIENTS_LIKERS_FAILURE = 'GET_CLIENTS_LIKERS_FAILURE';

export const POST_CLIENT = 'POST_CLIENT';
export const POST_CLIENT_SUCCESS = 'POST_CLIENT_SUCCESS';
export const POST_CLIENT_FAILURE = 'POST_CLIENT_FAILURE';

export const PUT_CLIENT = 'PUT_CLIENT';
export const PUT_CLIENT_SUCCESS = 'PUT_CLIENT_SUCCESS';
export const PUT_CLIENT_FAILURE = 'PUT_CLIENT_FAILURE';

export const DELETE_CLIENT = 'DELETE_CLIENT';
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';
export const DELETE_CLIENT_FAILURE = 'DELETE_CLIENT_FAILURE';

export const GET_POSTS_MAIN_FEED = 'GET_POSTS_MAIN_FEED';
export const GET_POSTS_MAIN_FEED_SUCCESS = 'GET_POSTS_MAIN_FEED_SUCCESS';
export const GET_POSTS_MAIN_FEED_FAILURE = 'GET_POSTS_MAIN_FEED_FAILURE';

export const GET_POSTS_BOOKMARKED = 'GET_POSTS_BOOKMARKED';
export const GET_POSTS_BOOKMARKED_SUCCESS = 'GET_POSTS_BOOKMARKED_SUCCESS';
export const GET_POSTS_BOOKMARKED_FAILURE = 'GET_POSTS_BOOKMARKED_FAILURE';

export const POST_POST = 'POST_POST';
export const POST_POST_SUCCESS = 'POST_POST_SUCCESS';
export const POST_POST_FAILURE = 'POST_POST_FAILURE';

/* Actions */
export interface GetClientMyselfProcessing {
  type: typeof GET_CLIENT_MYSELF;
  payload: {
    requestInfo: RequestInfo;
    getClientMyself: GetClientMyselfArgs;
  };
}

export interface GetClientMyselfFailure {
  type: typeof GET_CLIENT_MYSELF_FAILURE;
  payload: {
    requestInfo: RequestInfo;
  };
}

export interface GetClientMyselfSuccess {
  type: typeof GET_CLIENT_MYSELF_SUCCESS;
  payload: {
    requestInfo: RequestInfo;
  };
}

export type RequestAction = GetClientMyselfProcessing | GetClientMyselfFailure | GetClientMyselfSuccess;
