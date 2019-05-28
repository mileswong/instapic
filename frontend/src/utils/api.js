import axios from 'axios';

import { BASE_URL } from 'constants/index';


const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// user api
export const apiLoginUser = payload => instance.post('users/login', payload);
export const apiSignupUser = payload => instance.post('users/signup', payload);
export const apiRefreshUser = () => fetch(`${BASE_URL}/users/refresh`, {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  referrer: 'no-referrer',
});

// post api
export const apiGetAllPosts = () => instance.get('posts');
export const apiGetUserPosts = (userId) => instance.get(`users/${userId}/posts`);
export const apiAddUserNewPost = payload => fetch(`${BASE_URL}/posts`, {
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
  referrer: 'no-referrer',
  body: payload,
});
