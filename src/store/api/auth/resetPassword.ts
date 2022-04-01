import axios from 'axios';
import { BASE_URL } from '../config';

export const resetPassword = (data: { password: string; token: string }) => {
  axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  return axios.post(`${BASE_URL}/reset-password/`, data);
};
