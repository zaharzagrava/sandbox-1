import { commentsConstants } from '.';

export type State = {
  comment: any;
  comments: any[];
  loading: boolean;
  error: null | string;
};

const initialState = {
  // placeholder for an comment to display anywhere on the frontend
  comment: null,
  // placeholder for comments to display anywhere on the frontend
  comments: [],
  // is comment / comments loading
  loading: false,
  // is comment / comments request got an error
  error: null,
};

export const commentsReducer = (state = initialState, action: any) => {
  const { type, comment, comments, error } = action;

  switch (type) {
    case commentsConstants.GET_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case commentsConstants.GET_COMMENT_SUCCESS:
      return { ...state, comment, loading: false, error: null };
    case commentsConstants.GET_COMMENT_FAILURE:
      return { ...state, error, loading: false };

    case commentsConstants.CREATE_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case commentsConstants.CREATE_COMMENT_SUCCESS:
      return { ...state, comment, loading: false, error: null };
    case commentsConstants.CREATE_COMMENT_FAILURE:
      return { ...state, error, loading: false };

    case commentsConstants.UPDATE_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case commentsConstants.UPDATE_COMMENT_SUCCESS:
      return { ...state, loading: false, error: null };
    case commentsConstants.UPDATE_COMMENT_FAILURE:
      return { ...state, error, loading: false };

    case commentsConstants.DESTROY_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case commentsConstants.DESTROY_COMMENT_SUCCESS:
      return { ...state, loading: false, error: null };
    case commentsConstants.DESTROY_COMMENT_FAILURE:
      return { ...state, error, loading: false };

    case commentsConstants.GET_COMMENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case commentsConstants.GET_COMMENTS_SUCCESS:
      return { ...state, comments, loading: false, error: null };
    case commentsConstants.GET_COMMENTS_FAILURE:
      return { ...state, error, loading: false };

    default:
      return state;
  }
};
