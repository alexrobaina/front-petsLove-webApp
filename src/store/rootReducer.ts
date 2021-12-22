// Leer documentación también.
import { combineReducers } from '@reduxjs/toolkit';

import loginReducer from './slices/login';
import signUpReducer from './slices/signUp';
import forgotPasswordReducer from './slices/forgotPassword';

export default combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  forgotPassword: forgotPasswordReducer,
});
