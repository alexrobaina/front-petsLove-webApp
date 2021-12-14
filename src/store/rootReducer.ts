// Leer documentación también.
import { combineReducers } from '@reduxjs/toolkit';

import loginReducer from './slices/login';

export default combineReducers({
  login: loginReducer,
});
