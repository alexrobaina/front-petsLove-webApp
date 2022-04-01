import axios from 'axios';
import { BASE_URL } from '../config';

export const dashboard = (userId: string) =>
  axios.get(`${BASE_URL}/user/dashboard?_id=${userId}`);

export const filterDashboardPets = (data: {
  userId: string;
  gender: string;
  isAdopt: boolean;
  namePet: string;
  limit: number;
  page: number;
  category: string;
}) =>
  axios.get(
    `${BASE_URL}/pets/PetsDashboard?_id=${data.userId}&gender=${data.gender}&adopted=${data.isAdopt}&name=${data.namePet}&category=${data.category}&limit=${data.limit}&page=${data.page}`,
  );
