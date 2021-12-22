import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'forgotPassword';

export const initialState = {
  data: {},
  isLoading: false,
  error: false,
  success: false,
};

const forgotPasswordSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    forgotPasswordStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    forgotPasswordSuccess(state, { payload }) {
      state.error = false;
      state.data = payload;
      state.success = true;
      state.isLoading = false;
    },
    forgotPasswordFailure(state, action) {
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

const { actions, reducer } = forgotPasswordSlice;

export const {
  cleanErrors,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} = actions;

export const forgotPassword = createAction<{
  email: string;
}>(`${sliceName}/forgotPassword`);

export const cleanErrorsAction = createAction(`${sliceName}/cleanError`);

export default reducer;
