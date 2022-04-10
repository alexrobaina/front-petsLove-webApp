import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'updatePet';

export const initialState = {
  data: {},
  isLoading: false,
  error: false,
  success: false,
};

const updatePetSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    updatePetStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    updatePetSuccess(state, { payload }) {
      state.error = false;
      state.data = payload.data;
      state.success = true;
      state.isLoading = false;
    },
    updatePetFailure(state) {
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

const { actions, reducer } = updatePetSlice;

export const { updatePetStart, updatePetSuccess, updatePetFailure, cleanErrors } =
  actions;

export const updatePet = createAction<any>(`${sliceName}/updatePet`);

export const cleanErrorsUpdateAction = createAction(`${sliceName}/cleanErrorUpdate`);

export default reducer;
