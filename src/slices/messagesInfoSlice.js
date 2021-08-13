/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsInfoActions, fetchChannels } from './channelsInfoSlice.js';

const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(channelsInfoActions.removeChannel, (state, action) => {
        state.messages = state.messages.filter((message) => message.channelId !== action.payload);
      });
  },
});

export const { actions } = messagesInfoSlice;

export default messagesInfoSlice.reducer;
