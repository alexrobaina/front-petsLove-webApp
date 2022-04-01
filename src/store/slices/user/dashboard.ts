import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'dashboard';

export const initialState = {
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
  },
});

const { actions, reducer } = dashboardSlice;

export const {
  dashboardStart,
  dashboardSuccess,
  dashboardFailure,
  filterDashboardPetsStart,
  filterDashboardPetsSuccess,
  filterDashboardPetsFailure,
} = actions;

export const dashboard = createAction<{ userId: string }>(`${sliceName}/dashboard`);
export const filterDashboardPets = createAction<{
  userId: string;
  gender: string;
  isAdopt: boolean;
  namePet: string;
  limit: number;
  page: number;
  category: string;
}>(`${sliceName}/filterDashboardPets`);

export default reducer;
