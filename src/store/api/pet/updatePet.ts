import axios from 'axios';
import { TCreatePetSlice } from '../../../views/CreatePet/types';
import { BASE_URL } from '../config';

export const updatePet = async (data: TCreatePetSlice) => {
  const formData: any = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    const conditionsType = ['newImages', 'medicalNotes', 'location', 'images'];

    if (!conditionsType.includes(key)) {
      formData.append(key, value);
    }

    if (key === 'location') {
      formData.append('location', data.location);
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

  if (data?.medicalNotes) {
    data.medicalNotes.forEach((note: any) => {
      formData.append('medicalNotes', JSON.stringify(note));
    });
  }

  if (data?.newImages) {
    // eslint-disable-next-line no-unused-vars
    Object.entries(data.newImages).forEach(([key, value]: any) => {
      formData.append('newImages', value);
    });
  }

  return axios.put(`${BASE_URL}/pet?_id=${data._id}`, formData);
};
