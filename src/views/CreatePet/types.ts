import { FormikErrors } from 'formik';
import { ChangeEvent } from 'react';

export type TValues = {
  images: any;
  age: string;
  name: string;
  city: string;
  color: string;
  gender: string;
  weight: string;
  country: string;
  adopted: boolean;
  category: string;
  medicalNotes: any;
  description: string;
  textAddress: string;
  userVet: string | null;
  titleMedicalNote: string;
  detailMedicalNote: string;
  userAdopted: string | null;
  location: {
    lat: number;
    lng: number;
  };
};

export type TCreatePetSlice = {
  images: any;
  age: string;
  name: string;
  city: string;
  color: string;
  bucket: string;
  gender: string;
  weight: string;
  country: string;
  adopted: boolean;
  category: string;
  userVet: string | null;
  medicalNotes: any;
  description: string;
  textAddress: string;
  userAdopted: string | null;
  location: {
    lat: number;
    lng: number;
  };
};

export interface ICreatePetFormProps {
  testId: string;
  submitForm: any;
  values: TValues;
  titlePage: string;
  setFieldValue: any;
  usersVetEmailList: any[];
  goToDashboard: () => void;
  usersAdoptedEmailList: any[];
  errors: FormikErrors<TValues>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ICreatePet {
  petId?: string;
}
