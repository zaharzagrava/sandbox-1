import produce from 'immer';

import { GetClientMyselfArgs, RequestStatus } from '../types';

/* State */
export interface RequestsState {
  get_session: RequestStatus;
  post_session: RequestStatus;
  delete_session: RequestStatus;
  get_tables: RequestStatus;
  get_client_myself: RequestStatus;
  get_client_other: RequestStatus;
  get_clients_followers: RequestStatus;
  get_clients_close_friends: RequestStatus;
  get_clients_interesting_people: RequestStatus;
  get_clients_likers: RequestStatus;
  post_client: RequestStatus;
  put_client: RequestStatus;
  delete_client: RequestStatus;
  get_posts_main_feed: RequestStatus;
  get_posts_bookmarked: RequestStatus;
  post_post: RequestStatus;
}

/* Initial State */
const initialState = {
  get_session: 'none',
  post_session: 'none',
  delete_session: 'none',
  get_tables: 'none',
  get_client_myself: 'none',
  get_client_other: 'none',
  get_clients_followers: 'none',
  get_clients_close_friends: 'none',
  get_clients_interesting_people: 'none',
  get_clients_likers: 'none',
  post_client: 'none',
  put_client: 'none',
  delete_client: 'none',
  get_posts_main_feed: 'none',
  get_posts_bookmarked: 'none',
  post_post: 'none'
};

/* Reducer */
export const RequestReducer = produce((draft: RequestsState, action: RequestAction) => {
  switch (action.type) {
    case RequestConstants.GET_CLIENT_MYSELF:
      draft.get_client_myself = action.payload.status;
      return;

    default:
      return;
  }
}, initialState);

/* Action Types */
export const RequestConstants = {
  GET_SESSION: 'GET_SESSION',
  POST_SESSION_UPDATE: 'POST_SESSION_UPDATE',
  DELETE_SESSION: 'DELETE_SESSION',
  GET_TABLES: 'GET_TABLES',
  GET_CLIENT_MYSELF: 'GET_CLIENT_MYSELF',
  GET_CLIENT_OTHER: 'GET_CLIENT_OTHER',
  GET_CLIENTS_FOLLOWERS: 'GET_CLIENTS_FOLLOWERS',
  GET_CLIENTS_CLOSE_FRIENDS: 'GET_CLIENTS_CLOSE_FRIENDS',
  GET_CLIENTS_INTERESTING_PEOPLE: 'GET_CLIENTS_INTERESTING_PEOPLE',
  GET_CLIENTS_LIKERS: 'GET_CLIENTS_LIKERS',
  POST_CLIENT: 'POST_CLIENT',
  PUT_CLIENT: 'PUT_CLIENT',
  DELETE_CLIENT: 'DELETE_CLIENT',
  GET_POSTS_MAIN_FEED: 'GET_POSTS_MAIN_FEED',
  GET_POSTS_BOOKMARKED: 'GET_POSTS_BOOKMARKED',
  POST_POST: 'POST_POST'
};

/* Actions */
export interface GetClientMyselfAction {
  type: typeof RequestConstants.GET_CLIENT_MYSELF;
  payload: {
    status: RequestStatus;
    getClientMyself: GetClientMyselfArgs;
  };
}

export type RequestAction = GetClientMyselfAction;

/* Action Creators */
export const RequestActionCreators = {
  getClientMyself: (status: RequestStatus, getClientMyself: GetClientMyselfArgs): GetClientMyselfAction => ({
    type: RequestConstants.GET_CLIENT_MYSELF,
    payload: {
      status,
      getClientMyself
    }
  })
};
