import { sessionConstants } from '.';

export type State = {
  user: any;
  loadings: {
    GET_SESSION_REQUEST: boolean;
    CREATE_SESSION_REQUEST: boolean;
    DESTROY_SESSION_REQUEST: boolean;
  };
  // is any of session request returned error
  errors: {
    GET_SESSION_REQUEST: { status: number; message: string } | null;
    CREATE_SESSION_REQUEST: { status: number; message: string } | null;
    DESTROY_SESSION_REQUEST: { status: number; message: string } | null;
  };
};

const initialState = {
  // currenty logged in user
  user: null,
  // is anythinh in session slice is loading
  loadings: {
    GET_SESSION_REQUEST: true,
    CREATE_SESSION_REQUEST: false,
    DESTROY_SESSION_REQUEST: false,
  },
  // is any of session request returned error
  errors: {
    GET_SESSION_REQUEST: null,
    CREATE_SESSION_REQUEST: null,
    DESTROY_SESSION_REQUEST: null,
  },
};

export const sessionReducer = (state = initialState, action: any) => {
  const { type, user, error } = action;

  switch (type) {
    case sessionConstants.GET_SESSION_REQUEST:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          GET_SESSION_REQUEST: true,
        },
        errors: {
          ...state.errors,
          GET_SESSION_REQUEST: null,
        },
      };
    case sessionConstants.GET_SESSION_SUCCESS:
      return {
        ...state,
        user,
        loadings: {
          ...state.loadings,
          GET_SESSION_REQUEST: false,
        },
        errors: {
          ...state.errors,
          GET_SESSION_REQUEST: null,
        },
      };
    case sessionConstants.GET_SESSION_FAILURE:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          GET_SESSION_REQUEST: false,
        },
        errors: {
          ...state.errors,
          GET_SESSION_REQUEST: error,
        },
      };

    case sessionConstants.CREATE_SESSION_REQUEST:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          CREATE_SESSION_REQUEST: true,
        },
        errors: {
          ...state.errors,
          CREATE_SESSION_REQUEST: null,
        },
      };
    case sessionConstants.CREATE_SESSION_SUCCESS:
      return {
        ...state,
        user,
        loadings: {
          ...state.loadings,
          CREATE_SESSION_REQUEST: false,
        },
        errors: {
          ...state.errors,
          CREATE_SESSION_REQUEST: null,
        },
      };
    case sessionConstants.CREATE_SESSION_FAILURE:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          CREATE_SESSION_REQUEST: false,
        },
        errors: {
          ...state.errors,
          CREATE_SESSION_REQUEST: error,
        },
      };

    case sessionConstants.DESTROY_SESSION_REQUEST:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          DESTROY_SESSION_REQUEST: true,
        },
        errors: {
          ...state.errors,
          DESTROY_SESSION_REQUEST: null,
        },
      };
    case sessionConstants.DESTROY_SESSION_SUCCESS:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          DESTROY_SESSION_REQUEST: false,
        },
        errors: {
          ...state.errors,
          DESTROY_SESSION_REQUEST: null,
        },
      };
    case sessionConstants.DESTROY_SESSION_FAILURE:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          DESTROY_SESSION_REQUEST: false,
        },
        errors: {
          ...state.errors,
          DESTROY_SESSION_REQUEST: error,
        },
      };

    default:
      return state;
  }
};
