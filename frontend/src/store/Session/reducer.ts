import { sessionConstants } from '.';

export type State = {
  user: any;
  loading: boolean;
  error: { status: number; message: string };
};

const initialState = {
  // currenty logged in user
  user: null,
  // is session loading
  loading: true,
  // is session returned error
  error: null,
};

export const sessionReducer = (state = initialState, action: any) => {
  const { type, user, error } = action;

  switch (type) {
    case sessionConstants.GET_SESSION_REQUEST:
      return { ...state, loading: true, error: null };
    case sessionConstants.GET_SESSION_SUCCESS:
      return { ...state, user, loading: false };
    case sessionConstants.GET_SESSION_FAILED:
      return { ...state, error, loading: false };

    case sessionConstants.CREATE_SESSION_REQUEST:
      return { ...state, loading: true, error: null };
    case sessionConstants.CREATE_SESSION_SUCCESS:
      return { ...state, user, loading: false };
    case sessionConstants.CREATE_SESSION_FAILED:
      return { ...state, error, loading: false };

    case sessionConstants.DESTROY_SESSION_REQUEST:
      return { ...state, loading: true, error: null };
    case sessionConstants.DESTROY_SESSION_SUCCESS:
      return { ...state, loading: false };
    case sessionConstants.DESTROY_SESSION_FAILED:
      return { ...state, error, loading: false };

    default:
      return state;
  }
};
