import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsInfoSlice.js';
import messagesReducer from './slices/messagesInfoSlice.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
  },
});

export default store;