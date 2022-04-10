import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'getPet';

export const initialState = {
  data: {},
  isLoading: false,
  error: false,
  success: false,
};

const getPetSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    getPetStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    getPetSuccess(state, { payload }) {
      state.error = false;
      state.data = payload.data;
      state.success = true;
      state.isLoading = false;
    },
    getPetFailure(state) {
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

const { actions, reducer } = getPetSlice;

export const { getPetStart, getPetSuccess, getPetFailure, cleanErrors } = actions;

export const getPet = createAction<{ id: string }>(`${sliceName}/getPet`);

export const cleanErrorsAction = createAction(`${sliceName}/cleanErrorGetPet`);

export default reducer;
