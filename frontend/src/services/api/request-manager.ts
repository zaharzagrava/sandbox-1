import axios from 'axios';

// import { API_URL } from "../../constants.ts";

const API_URL = 'http://localhost:4000';

axios.defaults.withCredentials = true;

export const requestManager = {
  get: (path: any, params: any = {}) => axios.get(`${API_URL}/${path}`, params),
  post: (path: any, params: any = {}) =>
    axios.post(`${API_URL}/${path}`, params),
  put: (path: any, params: any = {}) => axios.put(`${API_URL}/${path}`, params),
  delete: (path: any, params: any = {}) =>
    axios.delete(`${API_URL}/${path}`, params),
};
