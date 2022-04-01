import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'listUsersTypeRole';

export const initialState = {
  listUsersTypeRole: { data: {}, isLoading: false, success: false },
};

const listUsersTypeRoleSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    listUsersTypeRoleStart(state) {
      state.listUsersTypeRole.data = {};
      state.listUsersTypeRole.isLoading = true;
    },
    listUsersTypeRoleSuccess(state, { payload }) {
      state.listUsersTypeRole.data = payload.data.userDB;
      state.listUsersTypeRole.success = true;
      state.listUsersTypeRole.isLoading = false;
    },
    listUsersTypeRoleFailure(state, action) {
      state.listUsersTypeRole.success = false;
      state.listUsersTypeRole.isLoading = false;
      state.listUsersTypeRole.data = action.payload;
    },
  },
});

const { actions, reducer } = listUsersTypeRoleSlice;

export const {
  listUsersTypeRoleStart,
  listUsersTypeRoleSuccess,
  listUsersTypeRoleFailure,
} = actions;

export const listUsersTypeRole = createAction<{ role: [string, string] }>(
  `${sliceName}/listUsersTypeRole`,
);

export default reducer;
