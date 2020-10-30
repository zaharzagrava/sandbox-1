import { AxiosRequestConfig } from 'axios';
import { requestManager } from './request-manager';

export const api = {
  session: {
    get: () => requestManager.get(`session`),
    create: (loginData: any) =>
      requestManager.post(`session`, { data: loginData }),
    destroy: () => requestManager.delete(`session`),
  },
  users: {
    get: (id: number) => requestManager.get(`clients/${id}`),
    getAll: () => requestManager.get(`clients/`),
    create: (user: any) => requestManager.post(`clients`, { data: user }),
    update: (user: any) => requestManager.put(`clients`, { data: user }),
    updatePassword: (passwords: any) =>
      requestManager.put(`clients/password`, { data: passwords }),
    destroy: () => requestManager.delete(`clients`),
  },
  posts: {
    get: (id: number) => requestManager.get(`posts/${id}`),
    getAll: (params: any) => requestManager.get(`posts/`, { params }),
    create: (post: any) => requestManager.post(`posts`, { data: post }),
    update: (id: number, post: any) =>
      requestManager.put(`posts/${id}`, { data: post }),
    destroy: (id: number) => requestManager.delete(`posts/${id}`),
  },
  comments: {
    get: (id: number) => requestManager.get(`comments/${id}`),
    getAll: () => requestManager.get(`comments/`),
    create: (comment: any, post_id: number) =>
      requestManager.post(`comments`, {
        data: comment,
        params: { post_id: post_id },
      }),
    update: (id: number, comment: any) =>
      requestManager.put(`comments/${id}`, comment),
    destroy: (id: number) => requestManager.delete(`comments/${id}`),
  },
};
