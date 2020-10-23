import { sessionConstants } from '.';

export const sessionActions = {
  // test if logged in
  getSession: () => ({
    type: sessionConstants.GET_SESSION_REQUEST,
  }),
  getSessionSuccess: (user: any) => ({
    type: sessionConstants.GET_SESSION_SUCCESS,
    user,
  }),
  getSessionFailure: (error: any) => ({
    type: sessionConstants.GET_SESSION_FAILED,
    error,
  }),

  // login
  createSession: (body: any) => ({
    type: sessionConstants.CREATE_SESSION_REQUEST,
    body,
  }),
  createSessionSuccess: (user: any) => ({
    type: sessionConstants.CREATE_SESSION_SUCCESS,
    user,
  }),
  createSessionFailure: (error: any) => ({
    type: sessionConstants.CREATE_SESSION_FAILED,
    error,
  }),

  // logout
  destroySession: () => ({
    type: sessionConstants.DESTROY_SESSION_REQUEST,
  }),
  destroySessionSuccess: () => ({
    type: sessionConstants.DESTROY_SESSION_SUCCESS,
  }),
  destroySessionFailure: (error: any) => ({
    type: sessionConstants.DESTROY_SESSION_FAILED,
    error,
  }),
};
