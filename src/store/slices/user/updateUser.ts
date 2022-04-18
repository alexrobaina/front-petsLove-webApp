import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'updateUser';

export const initialState = {
  data: {},
  isLoading: false,
  error: false,
  success: false,
};

const updateUserSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    updateUserStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    updateUserSuccess(state, { payload }) {
      state.error = false;
      state.data = payload.data;
      state.success = true;
      state.isLoading = false;
    },
    updateUserFailure(state) {
      state.error = true;
      state.success = false;
      state.isLoading = false;
    },
    cleanErrors(state) {
      state.data = {};
      state.error = false;
      state.success = false;
      state.isLoading = false;
    },
  },
});

const { actions, reducer } = updateUserSlice;

export const { updateUserStart, updateUserSuccess, updateUserFailure, cleanErrors } =
  actions;

export const updateUser = createAction<any>(`${sliceName}/updateUser`);

export const cleanErrorsUpdateAction = createAction(`${sliceName}/cleanErrorUpdate`);

export default reducer;
