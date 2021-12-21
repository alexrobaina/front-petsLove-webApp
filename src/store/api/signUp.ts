import axios from 'axios';
import { TSignUpForm } from '../../views/SignUp/types';
import { BASE_URL } from './config';

export const signUp = (data: TSignUpForm) => axios.post(`${BASE_URL}/user/`, data);
