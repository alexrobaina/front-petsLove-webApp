// Leer documentación también.
import { combineReducers } from '@reduxjs/toolkit';

import loginReducer from './slices/auth/login';
import signUpReducer from './slices/auth/signUp';
import forgotPasswordReducer from './slices/auth/forgotPassword';
import resetPasswordReducer from './slices/auth/resetPassword';
import dashboardReducer from './slices/user/dashboard';
import createPetReducer from './slices/pet/createPet';
import getUsersTypeRoleReducer from './slices/user/getUsersTypeRole';

export default combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  dashboard: dashboardReducer,
  resetPassword: resetPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  createPet: createPetReducer,
  getUsersTypeRole: getUsersTypeRoleReducer,
});
