import { usersConstants } from '.';

export const usersActions = {
  /* Actions for both current and other users */
  getUser: (id: number) => ({
    type: usersConstants.GET_USER_REQUEST,
    id,
  }),
  getUserSuccess: (user: any) => ({
    type: usersConstants.GET_USER_SUCCESS,
    user,
  }),
  getUserFailed: (error: any) => ({
    type: usersConstants.GET_USER_FAILED,
    error,
  }),

  /* Only current user */
  createUser: (body: any) => ({
    type: usersConstants.CREATE_USER_REQUEST,
    body,
  }),
  createUserSuccess: (newUser: any) => ({
    type: usersConstants.CREATE_USER_SUCCESS,
    newUser,
  }),
  createUserFailed: (error: any) => ({
    type: usersConstants.CREATE_USER_FAILED,
    error,
  }),

  updateUser: (body: any) => ({
    type: usersConstants.UPDATE_USER_REQUEST,
    body,
  }),
  updateUserSuccess: (user: any) => ({
    type: usersConstants.UPDATE_USER_SUCCESS,
    user,
  }),
  updateUserFailed: (error: any) => ({
    type: usersConstants.UPDATE_USER_FAILED,
    error,
  }),

  destroyUser: () => ({
    type: usersConstants.DESTROY_USER_REQUEST,
  }),
  destroyUserSuccess: () => ({
    type: usersConstants.DESTROY_USER_SUCCESS,
  }),
  destroyUserFailed: (error: any) => ({
    type: usersConstants.DESTROY_USER_FAILED,
    error,
  }),

  /* Get multiple users */
  getUsers: (params: any) => ({
    type: usersConstants.GET_USERS_REQUEST,
    params,
  }),
  getUsersSuccess: (users: any) => ({
    type: usersConstants.GET_USERS_SUCCESS,
    users,
  }),
  getUsersFailed: (error: any) => ({
    type: usersConstants.GET_USERS_FAILED,
    error,
  }),
};
