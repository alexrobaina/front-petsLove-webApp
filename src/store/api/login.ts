import axios from 'axios';
import { BASE_URL } from './config';

export const login = (data: { email: string; password: string }) =>
  axios.post(`${BASE_URL}/login/`, data);
