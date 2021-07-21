/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return {
    Authorization: `Bearer ${userId.token}`,
  };
};

const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setInitialState: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: () => {},
    renameChannel: () => {},
    removeChannel: () => {},
  },
});

export const selectChannelById = (state, channelId) => {
  const result = state.channelsInfo.channels.find((channel) => channel.id === channelId);
  return result;
};

export const {
  setInitialState,
  setCurrentChannel,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsInfoSlice.actions;

export const setInitialStateThunk = () => async (dispatch) => {
  try {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    dispatch(setInitialState(response.data));
  } catch (error) {
    console.dir(error);
  }
};

export default channelsInfoSlice.reducer;
