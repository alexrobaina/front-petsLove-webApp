import axios from 'axios';
import { TCreatePetSlice } from '../../../views/CreatePet/types';
import { BASE_URL } from '../config';

export const createPet = async (data: TCreatePetSlice) => {
  let formData: any = new FormData();
  if (data.newImages) {
    Object.entries(data).forEach(([key, value]) => {
      const conditionsType = ['newImages', 'medicalNotes', 'location'];

      if (!conditionsType.includes(key)) {
        formData.append(key, value);
      }

      if (key === 'location') {
        formData.append('location', JSON.stringify(data.location));
      }
    });

    if (data?.medicalNotes) {
      data.medicalNotes.forEach((note: any) => {
        formData.append('medicalNotes', JSON.stringify(note));
      });
    }

    // eslint-disable-next-line no-unused-vars
    Object.entries(data.newImages).forEach(([key, value]: any) => {
      formData.append('newImages', value);
    });
  } else {
    formData = data;
  }

  return axios.post(`${BASE_URL}/pet`, formData);
};
