import axios from 'axios';
import { TCreatePetSlice } from '../../../views/CreatePet/types';
import { BASE_URL } from '../config';

export const updatePet = async (data: TCreatePetSlice) => {
  let formData: any = new FormData();

  if (data.newImages) {
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'newImages') {
        formData.append(key, value);
      }
      if (key === 'imageDeleted') {
        // eslint-disable-next-line no-unused-vars
        data.imageDeleted.forEach((image: any) => {
          formData.append('imageDeleted', image);
        });
      }
    });

    if (data.images) {
      data.images.forEach((image: any) => {
        formData.append('images', image);
      });
    }

    if (data?.newImages) {
      // eslint-disable-next-line no-unused-vars
      Object.entries(data.newImages).forEach(([key, value]: any) => {
        formData.append('newImages', value);
      });
    }
  } else {
    formData = data;
  }

  return axios.put(`${BASE_URL}/pet?_id=${data._id}`, formData);
};
