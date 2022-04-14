import axios from 'axios';
import { TCreatePetSlice } from '../../../views/CreatePet/types';
import { BASE_URL } from '../config';

export const updateUser = async (data: TCreatePetSlice) => {
  const formData: any = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    const conditionsType = ['newImages', 'location', 'images'];

    if (!conditionsType.includes(key)) {
      formData.append(key, value);
    }

    if (key === 'location') {
      formData.append('location', JSON.stringify(data.location));
    }
  });

  if (data.images) {
    data.images.forEach((image: any) => {
      formData.append('image', image);
    });
  }

  if (data?.newImages) {
    // eslint-disable-next-line no-unused-vars
    Object.entries(data.newImages).forEach(([key, value]: any) => {
      formData.append('newImages', value);
    });
  }

  return axios.put(`${BASE_URL}/usesdfr?_id=${data._id}`, formData);
};
