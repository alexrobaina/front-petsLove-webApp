import axios from 'axios';
import { BASE_URL } from '../config';

export const forgotPassword = (data: { email: string }) =>
  axios.post(`${BASE_URL}/forgot-password/`, data);
