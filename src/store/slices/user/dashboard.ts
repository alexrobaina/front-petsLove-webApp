import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'dashboard';

export const initialState = {
  deletePet: { data: {}, isLoading: false, success: false },
  userDashboard: { data: {}, isLoading: false, success: false },
  petsDashboard: { pets: {}, isLoading: false, success: false },
};

const dashboardSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    dashboardStart(state) {
      state.userDashboard.data = {};
      state.userDashboard.isLoading = true;
    },
    dashboardSuccess(state, { payload }) {
      state.userDashboard.data = payload.data;
      state.userDashboard.success = true;
      state.userDashboard.isLoading = false;
    },
    dashboardFailure(state, action) {
      state.userDashboard.success = false;
      state.userDashboard.isLoading = false;
      state.userDashboard.data = action.payload;
    },
    filterDashboardPetsStart(state) {
      state.petsDashboard.pets = {};
      state.petsDashboard.isLoading = true;
    },
    filterDashboardPetsSuccess(state, { payload }) {
      state.petsDashboard.pets = payload.data;
      state.petsDashboard.success = true;
      state.petsDashboard.isLoading = false;
    },
    filterDashboardPetsFailure(state, action) {
      state.petsDashboard.success = false;
      state.petsDashboard.isLoading = false;
      state.petsDashboard.pets = action.payload;
    },
    deletePetStart(state) {
      state.deletePet.data = {};
      state.deletePet.isLoading = true;
    },
    deletePetSuccess(state, { payload }) {
      state.deletePet.data = payload.data;
      state.deletePet.success = true;
      state.deletePet.isLoading = false;
    },
    deletePetFailure(state, action) {
      state.deletePet.success = false;
      state.deletePet.isLoading = false;
      state.deletePet.data = action.payload;
    },
  },
});

const { actions, reducer } = dashboardSlice;

export const {
  deletePetStart,
  deletePetSuccess,
  deletePetFailure,
  dashboardStart,
  dashboardSuccess,
  dashboardFailure,
  filterDashboardPetsStart,
  filterDashboardPetsSuccess,
  filterDashboardPetsFailure,
} = actions;

export const dashboard = createAction<{ userId: string }>(`${sliceName}/dashboard`);
export const deletePet = createAction<string>(`${sliceName}/deletePet`);

export const filterDashboardPets = createAction<{
  userId: string;
  gender: string;
  isAdopted: boolean;
  namePet: string;
  limit: number;
  page: number;
  category: string;
}>(`${sliceName}/filterDashboardPets`);

export default reducer;
