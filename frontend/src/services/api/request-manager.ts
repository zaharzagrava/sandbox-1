import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;

console.log(process.env.REACT_APP_API_URL);

export const requestManager = {
  get: (path: string, params?: AxiosRequestConfig) =>
    axios.get(`${process.env.REACT_APP_API_URL}/${path}`, params),
  post: (path: string, params?: AxiosRequestConfig) =>
    axios.post(
      `${process.env.REACT_APP_API_URL}/${path}`,
      params && params.data,
      params
    ),
  put: (path: string, params?: AxiosRequestConfig) =>
    axios.put(
      `${process.env.REACT_APP_API_URL}/${path}`,
      params && params.data,
      params
    ),
  delete: (path: string, params?: AxiosRequestConfig) =>
    axios.delete(`${process.env.REACT_APP_API_URL}/${path}`, params),
};
