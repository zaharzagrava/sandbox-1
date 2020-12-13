import { AppState } from './typedef';

export const getCLientMyselfData = (state: AppState) => {
  return state.clients.clients;
};
