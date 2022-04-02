import axios from 'axios';
import { BASE_URL } from '../config';

export const getPet = async (payload: { id: string }) =>
  axios.get(`${BASE_URL}/pet?_id=${payload.id}`);
