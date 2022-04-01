import axios from 'axios';
import { TCreatePetSlice } from '../../../views/CreatePet/types';
import { BASE_URL } from '../config';

export const createPet = async (data: TCreatePetSlice) => {
  let formData: any = new FormData();

  if (data.images) {
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(key, value);
      }
    });

    if (data.images.length === 1) {
      formData.append('images', data.images[0]);
    }

    if (data?.images?.length > 1) {
      // eslint-disable-next-line no-unused-vars
      Object.entries(data.images).forEach(([key, value]: any) => {
        formData.append('images', value);
      });
    }
  } else {
    formData = data;
  }

  return axios.post(`${BASE_URL}/pet`, formData);
};
