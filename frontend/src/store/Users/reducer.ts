import { usersConstants } from '.';

export type State = {
  user: any;
  users: any[];
  loading: boolean;
  error: null | string;
};

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = (state = initialState, action: any) => {
  const { type, user, users, error } = action;

  switch (type) {
    case usersConstants.GET_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.GET_USER_SUCCESS:
      return { ...state, user, loading: false };
    case usersConstants.GET_USER_FAILED:
      return { ...state, error, loading: false };

    case usersConstants.CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.CREATE_USER_SUCCESS:
      return { ...state, user, loading: false };
    case usersConstants.CREATE_USER_FAILED:
      return { ...state, error, loading: false };

    case usersConstants.UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.UPDATE_USER_SUCCESS:
      return { ...state, loading: false };
    case usersConstants.UPDATE_USER_FAILED:
      return { ...state, error, loading: false };

    case usersConstants.DESTROY_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.DESTROY_USER_SUCCESS:
      return { ...state, loading: false };
    case usersConstants.DESTROY_USER_FAILED:
      return { ...state, error, loading: false };

    default:
      return state;
  }
};
