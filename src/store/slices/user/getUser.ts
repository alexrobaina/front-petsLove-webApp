import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'getUser';

export const initialState = {
  getUser: { data: {}, isLoading: false, success: false },
};

const getUserSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    getUserStart(state) {
      state.getUser.data = {};
      state.getUser.isLoading = true;
    },
    getUserSuccess(state, { payload }) {
      state.getUser.data = payload.data.userDB;
      state.getUser.success = true;
      state.getUser.isLoading = false;
    },
    getUserFailure(state, action) {
      state.getUser.success = false;
      state.getUser.isLoading = false;
      state.getUser.data = action.payload;
    },
  },
});

const { actions, reducer } = getUserSlice;

export const { getUserStart, getUserSuccess, getUserFailure } = actions;

export const getUser = createAction<string>(`${sliceName}/getUser`);

export default reducer;
