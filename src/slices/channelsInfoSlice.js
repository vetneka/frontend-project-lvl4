/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import routes from '../routes.js';

import getAuthInfo from '../getAuthInfo.js';

const createAuthHeader = () => ({
  Authorization: `Bearer ${getAuthInfo().token}`,
});

const defaultChannelId = 1;

export const fetchChannels = createAsyncThunk('channelsInfo/fetchChannels', async () => {
  const response = await axios.get(routes.dataPath(), { headers: createAuthHeader() });
  return response.data;
});

const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
    processState: {
      status: 'loading',
      error: null,
    },
  },
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload);
      state.currentChannelId = defaultChannelId;
    },
    renameChannel: (state, { payload }) => {
      const existingChannel = state.channels.find((channel) => channel.id === payload.id);
      existingChannel.name = payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.processState.status = 'loading';
        state.processState.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
        state.processState.status = 'success';
      })
      .addCase(fetchChannels.rejected, (state, { error }) => {
        state.processState.status = 'error';
        state.processState.error = error.message;
      })
  },
});

export const selectChannelById = (state, channelId) => (
  state.channelsInfo.channels.find((channel) => channel.id === channelId));

export const { actions } = channelsInfoSlice;

export default channelsInfoSlice.reducer;
