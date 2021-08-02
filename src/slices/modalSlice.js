/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;
      state.type = payload.type || null;
      state.extra = payload.extra || null;
    },
    closeModal: () => initialState,
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
