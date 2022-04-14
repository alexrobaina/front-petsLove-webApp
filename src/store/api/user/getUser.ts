import axios from 'axios';
import { BASE_URL } from '../config';

export const getUser = (_id: string) => axios.get(`${BASE_URL}/user?_id=${_id}`);
