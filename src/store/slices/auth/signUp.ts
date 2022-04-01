import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'signUp';

export const initialState = {
  data: {},
  isLoading: false,
  error: false,
  success: false,
};

const signUpSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    signUpStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    signUpSuccess(state, { payload }) {
      state.error = false;
      state.data = payload.data;
      state.success = true;
      state.isLoading = false;
    },
    signUpFailure(state, action) {
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

const { actions, reducer } = signUpSlice;

export const { signUpStart, signUpSuccess, signUpFailure, cleanErrors } = actions;

export const signUp = createAction<{
  role: string;
  email: string;
  name?: string;
  phone?: string;
  password: string;
}>(`${sliceName}/signUp`);

export const cleanErrorsAction = createAction(`${sliceName}/cleanError`);

export default reducer;
