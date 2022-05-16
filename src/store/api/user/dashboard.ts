import axios from 'axios';
import { BASE_URL } from '../config';

export const dashboard = (userId: string) =>
  axios.get(`${BASE_URL}/user/dashboard?_id=${userId}`);

export const filterDashboardPets = (data: {
  page: number;
  limit: number;
  userId: string;
  gender: string;
  namePet: string;
  isAdopted: boolean;
  category: string;
}) =>
  axios.get(
    `${BASE_URL}/pets/PetsDashboard?_id=${data.userId}&gender=${data.gender}&adopted=${data.isAdopted}&name=${data.namePet}&category=${data.category}&limit=${data.limit}&page=${data.page}`,
  );

export const deletePet = (petId: any) =>
  axios.delete(`${BASE_URL}/pet/delete?_id=${petId}`);
