import { requestManager } from './request-manager';

export const api = {
  session: {
    get: (id: number) => requestManager.get(`session`),
    create: (params: any) => requestManager.post(`session`, params),
    destroy: () => requestManager.delete(`session`),
  },
  users: {
    getAll: (params: any) => requestManager.get(`clients/`, params),
    get: (id: number) => requestManager.get(`clients/${id}`),
    create: (params: any) => requestManager.post(`clients`, params),
    update: (params: any) => requestManager.put(`clients`, params),
    destroy: () => requestManager.delete(`clients`),
  },
  posts: {},
  comments: {},
};
