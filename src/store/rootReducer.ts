// Leer documentación también.
import { combineReducers } from '@reduxjs/toolkit';

import accountReducer from './slices/account';

export default combineReducers({
  account: accountReducer,
});
