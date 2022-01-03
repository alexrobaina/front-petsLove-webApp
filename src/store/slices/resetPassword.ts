import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'resetPassword';

export const initialState = {
  data: {},
  error: false,
  success: false,
  isLoading: false,
};

const resetPasswordSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetPasswordStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    resetPasswordSuccess(state, { payload }) {
      state.error = false;
      state.success = true;
      state.isLoading = false;
      state.data = payload.data;
    },
    resetPasswordFailure(state, action) {
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

const { actions, reducer } = resetPasswordSlice;

export const {
  cleanErrors,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} = actions;

export const resetPassword = createAction<{
  token: string;
  password: string;
}>(`${sliceName}/resetPassword`);

export const cleanErrorsAction = createAction(`${sliceName}/cleanError`);

export default reducer;
