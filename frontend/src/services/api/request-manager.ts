import axios, { AxiosRequestConfig } from 'axios';

// import { API_URL } from "../../constants.ts";

const API_URL = 'http://localhost:4000';

axios.defaults.withCredentials = true;

export const requestManager = {
  get: (path: string, params?: AxiosRequestConfig) =>
    axios.get(`${API_URL}/${path}`, params),
  post: (path: string, params?: AxiosRequestConfig) =>
    axios.post(`${API_URL}/${path}`, params && params.data, params),
  put: (path: string, params?: AxiosRequestConfig) =>
    axios.put(`${API_URL}/${path}`, params && params.data, params),
  delete: (path: string, params?: AxiosRequestConfig) =>
    axios.delete(`${API_URL}/${path}`, params),
};
