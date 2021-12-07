import { createSlice, createAction } from '@reduxjs/toolkit';

const sliceName = 'account';

export const initialState = {
  data: {},
  isLoading: false,
  error: false,
  success: false,
};

const accountSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    accountStart(state) {
      state.data = {};
      state.error = false;
      state.isLoading = true;
    },
    accountSuccess(state, { payload }) {
      state.data = payload;
      state.isLoading = false;
      state.error = false;
      state.success = true;
    },
    accountFailure(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.error = true;
      state.success = false;
    },
    cleanErrors(state) {
      state.data = {};
      state.isLoading = false;
      state.error = false;
      state.success = false;
    },
  },
});

const { actions, reducer } = accountSlice;

export const { accountStart, accountSuccess, accountFailure, cleanErrors } = actions;

// export const getAccount = createAction<{}>(`${sliceName}/getAccount`);
export const connectAccount = createAction<{ address: string }>(
  `${sliceName}/conectAccount`,
);

export default reducer;
