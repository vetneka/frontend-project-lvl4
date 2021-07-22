import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsInfoSlice.js';
import messagesReducer from './slices/messagesInfoSlice.js';
import modalReducer from './slices/modalSlice.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    modal: modalReducer,
  },
});

export default store;
