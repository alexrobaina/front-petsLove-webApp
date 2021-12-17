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
      localStorage.setItem('token', payload.data.token);
      state.data = payload;
      state.token = payload.data.token;
      state.isLoading = false;
      state.error = false;
      state.success = true;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.error = true;
      state.success = false;
    },
    cleanErrors(state) {
      state.data = {};
      state.isLoading = false;
      state.error = false;
      state.success = false;
    },
  },
});

const { actions, reducer } = loginSlice;

export const { loginStart, loginSuccess, loginFailure, cleanErrors } = actions;

export const login = createAction<{ email: string; password: string }>(
  `${sliceName}/login`,
);

export default reducer;
