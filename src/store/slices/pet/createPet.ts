import { createSlice, createAction } from '@reduxjs/toolkit';
// import { TCreatePetSlice } from '../../views/CreatePet/types';

const sliceName = 'createPet';

export const initialState = {
  data: {},
  isLoading: false,
  error: false,
  success: false,
};

const createPetSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    createPetStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    createPetSuccess(state, { payload }) {
      state.error = false;
      state.data = payload.data;
      state.success = true;
      state.isLoading = false;
    },
    createPetFailure(state) {
      state.error = true;
      state.success = false;
      state.isLoading = false;
    },
    cleanErrors(state) {
      state.error = false;
      state.success = false;
      state.isLoading = false;
    },
  },
});

const { actions, reducer } = createPetSlice;

export const { createPetStart, createPetSuccess, createPetFailure, cleanErrors } =
  actions;

export const createPet = createAction<any>(`${sliceName}/createPet`);

export const cleanErrorsAction = createAction(`${sliceName}/cleanError`);

export default reducer;
