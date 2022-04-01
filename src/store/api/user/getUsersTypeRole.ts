import axios from 'axios';
import { BASE_URL } from '../config';

export const getUsersTypeRole = (data: { role: [string, string] }) =>
  axios.post(`${BASE_URL}/user/usersTypeRole`, data);
