import {REACT_APP_BASE_URL} from '@env';

const API_URL = REACT_APP_BASE_URL + '/api/' ?? '';

export const baseUrls = {
  base: API_URL,
  auth: 'auth',
  user: 'users',
  group: 'groups',
  message: 'messages',
  articles: 'articles',
};
export const authUrls = {
  login: baseUrls.auth + '/login',
  register: baseUrls.auth + '/register',
};
export const userUrls = {
  detail: baseUrls.user + '/detail',
};
export const groupUrls = {
  list: baseUrls.group,
};
