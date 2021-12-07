import axios from 'axios';
import { BASE_URL } from './config';

export const connectAccount = (address: string) => {
  return axios.post(`${BASE_URL}/users/register`, address);
};
