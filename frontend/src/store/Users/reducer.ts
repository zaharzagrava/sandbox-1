import { usersConstants } from '.';

export type State = {
  user: any;
  users: any[];
  loading: boolean;
  error: null | string;
};

const initialState = {
  // placeholder for an user to display anywhere on the frontend
  user: null,
  // placeholder for users to display anywhere on the frontend
  users: [],
  // is user / users loading
  loading: false,
  // is user / users request got an error
  error: null,
};

export const usersReducer = (state = initialState, action: any) => {
  const { type, user, users, error } = action;

  switch (type) {
    case usersConstants.GET_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.GET_USER_SUCCESS:
      return { ...state, user, loading: false, error: null };
    case usersConstants.GET_USER_FAILURE:
      return { ...state, error, loading: false };

    case usersConstants.CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.CREATE_USER_SUCCESS:
      return { ...state, user, loading: false, error: null };
    case usersConstants.CREATE_USER_FAILURE:
      return { ...state, error, loading: false };

    case usersConstants.UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.UPDATE_USER_SUCCESS:
      return { ...state, loading: false, error: null };
    case usersConstants.UPDATE_USER_FAILURE:
      return { ...state, error, loading: false };

    case usersConstants.UPDATE_USER_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.UPDATE_USER_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: null };
    case usersConstants.UPDATE_USER_PASSWORD_FAILURE:
      return { ...state, error, loading: false };

    case usersConstants.DESTROY_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.DESTROY_USER_SUCCESS:
      return { ...state, loading: false, error: null };
    case usersConstants.DESTROY_USER_FAILURE:
      return { ...state, error, loading: false };

    case usersConstants.GET_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case usersConstants.GET_USERS_SUCCESS:
      return { ...state, users, loading: false, error: null };
    case usersConstants.GET_USERS_FAILURE:
      return { ...state, error, loading: false };

    default:
      return state;
  }
};
