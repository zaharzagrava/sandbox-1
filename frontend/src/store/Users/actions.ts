import { error } from 'console';
import { usersConstants } from '.';

export const usersActions = {
  getUser: (id: number) => {
    type: usersConstants.GET_USER_REQUEST, id;
  },
  getUserSuccess: (user: any) => {
    type: usersConstants.GET_USER_SUCCESS, user;
  },
  getUserFailed: (error: any) => {
    type: usersConstants.GET_USER_FAILED, error;
  },

  createUser: (body: any) => {
    type: usersConstants.CREATE_USER_REQUEST, body;
  },
  createUserSuccess: (data: any) => {
    type: usersConstants.CREATE_USER_SUCCESS, data;
  },
  createUserFailed: (error: any) => {
    type: usersConstants.CREATE_USER_FAILED, error;
  },

  updateUser: (body: any) => {
    type: usersConstants.UPDATE_USER_REQUEST, body;
  },
  updateUserSuccess: (user: any) => {
    type: usersConstants.UPDATE_USER_SUCCESS, user;
  },
  updateUserFailed: (error: any) => {
    type: usersConstants.UPDATE_USER_FAILED, error;
  },

  destroyUser: () => {
    type: usersConstants.DESTROY_USER_REQUEST;
  },
  destroyUserSuccess: (data: any) => {
    type: usersConstants.DESTROY_USER_SUCCESS, data;
  },
  destroyUserFailed: (error: any) => {
    type: usersConstants.DESTROY_USER_FAILED, error;
  },
};
