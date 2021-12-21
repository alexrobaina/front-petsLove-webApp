// Leer documentación también.
import { combineReducers } from '@reduxjs/toolkit';

import loginReducer from './slices/login';
import signUpReducer from './slices/signUp';

export default combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
});
