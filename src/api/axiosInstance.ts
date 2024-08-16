import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASE_URL} from '@env';

const LOCAL_API = REACT_APP_BASE_URL ?? '';

const axiosInstance = axios.create({
  baseURL: LOCAL_API + '/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      Promise.reject(error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.clear();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
