import { postsConstants } from '.';

export type State = {
  post: any;
  posts: any[];
  loading: boolean;
  error: null | string;
};

const initialState = {
  // placeholder for an post to display anywhere on the frontend
  post: null,
  // placeholder for posts to display anywhere on the frontend
  posts: [],
  // is post / posts loading
  loading: false,
  // is post / posts request got an error
  error: null,
};

export const postsReducer = (state = initialState, action: any) => {
  const { type, post, posts, error } = action;

  switch (type) {
    case postsConstants.GET_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case postsConstants.GET_POST_SUCCESS:
      return { ...state, post, loading: false, error: null };
    case postsConstants.GET_POST_FAILURE:
      return { ...state, error, loading: false };

    case postsConstants.CREATE_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case postsConstants.CREATE_POST_SUCCESS:
      return { ...state, post, loading: false, error: null };
    case postsConstants.CREATE_POST_FAILURE:
      return { ...state, error, loading: false };

    case postsConstants.UPDATE_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case postsConstants.UPDATE_POST_SUCCESS:
      return { ...state, loading: false, error: null };
    case postsConstants.UPDATE_POST_FAILURE:
      return { ...state, error, loading: false };

    case postsConstants.DESTROY_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case postsConstants.DESTROY_POST_SUCCESS:
      return { ...state, loading: false, error: null };
    case postsConstants.DESTROY_POST_FAILURE:
      return { ...state, error, loading: false };

    case postsConstants.GET_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case postsConstants.GET_POSTS_SUCCESS:
      return { ...state, posts, loading: false, error: null };
    case postsConstants.GET_POSTS_FAILURE:
      return { ...state, error, loading: false };

    default:
      return state;
  }
};
