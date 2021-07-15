import { createSlice } from "@reduxjs/toolkit";

const messagesInfoSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    setInitialState: (state, { payload }) => {
      state.messages = payload.messages;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const { setInitialState, addMessage } = messagesInfoSlice.actions;

export default messagesInfoSlice.reducer;
