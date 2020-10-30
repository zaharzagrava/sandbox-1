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
  getUserFailure: (error: any) => ({
    type: usersConstants.GET_USER_FAILURE,
    error,
  }),

  /* Get multiple users */
  getUsers: () => ({
    type: usersConstants.GET_USERS_REQUEST,
  }),
  getUsersSuccess: (users: any) => ({
    type: usersConstants.GET_USERS_SUCCESS,
    users,
  }),
  getUsersFailure: (error: any) => ({
    type: usersConstants.GET_USERS_FAILURE,
    error,
  }),

  /* Only current user */
  createUser: (user: any) => ({
    type: usersConstants.CREATE_USER_REQUEST,
    user,
  }),
  createUserSuccess: (user: any) => ({
    type: usersConstants.CREATE_USER_SUCCESS,
    user,
  }),
  createUserFailure: (error: any) => ({
    type: usersConstants.CREATE_USER_FAILURE,
    error,
  }),

  updateUser: (user: any) => ({
    type: usersConstants.UPDATE_USER_REQUEST,
    user,
  }),
  updateUserSuccess: (user: any) => ({
    type: usersConstants.UPDATE_USER_SUCCESS,
    user,
  }),
  updateUserFailure: (error: any) => ({
    type: usersConstants.UPDATE_USER_FAILURE,
    error,
  }),

  updateUserPassword: (passwords: any) => ({
    type: usersConstants.UPDATE_USER_PASSWORD_REQUEST,
    passwords,
  }),
  updateUserPasswordSuccess: () => ({
    type: usersConstants.UPDATE_USER_PASSWORD_SUCCESS,
  }),
  updateUserPasswordFailure: (error: any) => ({
    type: usersConstants.UPDATE_USER_PASSWORD_FAILURE,
    error,
  }),

  destroyUser: () => ({
    type: usersConstants.DESTROY_USER_REQUEST,
  }),
  destroyUserSuccess: () => ({
    type: usersConstants.DESTROY_USER_SUCCESS,
  }),
  destroyUserFailure: (error: any) => ({
    type: usersConstants.DESTROY_USER_FAILURE,
    error,
  }),
};
