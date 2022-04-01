import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'login';

export const initialState = {
  data: {},
  token: '',
  isLoading: false,
  error: false,
  success: false,
};

const loginSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    loginStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    loginSuccess(state, { payload }) {
      state.error = false;
      state.data = payload;
      state.success = true;
      state.isLoading = false;
      state.token = payload.data.token;
      localStorage.setItem('token', payload.data.token);
      localStorage.setItem('user', JSON.stringify(payload.data.user));
    },
    loginFailure(state, action) {
      state.error = true;
      state.success = false;
      state.isLoading = false;
      state.data = action.payload;
    },
    cleanErrors(state) {
      state.data = {};
      state.error = false;
      state.success = false;
      state.isLoading = false;
    },
  },
});

const { actions, reducer } = loginSlice;

export const { loginStart, loginSuccess, loginFailure, cleanErrors } = actions;

export const login = createAction<{ email: string; password: string }>(
  `${sliceName}/login`,
);

export const cleanErrorsAction = createAction(`${sliceName}/cleanError`);

export default reducer;
