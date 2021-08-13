/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

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

export const selectModalType = (state) => state.modal.type;
export const selectModalExtraChannel = createSelector(
  [
    (state) => state.channelsInfo.channels,
    (state) => state.modal.extra.channelId,
  ],
  (channels, id) => channels.find((channel) => channel.id === id),
);

export const { actions } = modalSlice;

export default modalSlice.reducer;
