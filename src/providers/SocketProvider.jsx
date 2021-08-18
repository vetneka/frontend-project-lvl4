import React from 'react';
import { useDispatch } from 'react-redux';

import { socketContext } from '../contexts/index';

import { actions as channelsInfoActions } from '../slices/channelsInfoSlice';
import { actions as messagesInfoActions } from '../slices/messagesInfoSlice';

const ackTimeout = 2000;

const socketEvents = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const acknowledgeWithTimeout = (onSuccess, onTimeout, timeout) => {
  const status = {
    isCalled: false,
  };

  const timerId = setTimeout(() => {
    if (status.isCalled) return;
    status.isCalled = true;
    onTimeout();
  }, timeout);

  return (...args) => {
    if (status.isCalled) return;
    status.isCalled = true;
    clearTimeout(timerId);
    onSuccess(args);
  };
};

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const createEmit = (event) => (message, onSuccess, onTimeout) => {
    socket.emit(event, message, acknowledgeWithTimeout(onSuccess, onTimeout, ackTimeout));
  };

  socket.on(socketEvents.newMessage, (message) => {
    dispatch(messagesInfoActions.addMessage(message));
  });

  socket.on(socketEvents.newChannel, (channel) => {
    dispatch(channelsInfoActions.addChannel(channel));
  });

  socket.on(socketEvents.removeChannel, ({ id }) => {
    dispatch(channelsInfoActions.removeChannel(id));
  });

  socket.on(socketEvents.renameChannel, (channel) => {
    dispatch(channelsInfoActions.renameChannel(channel));
  });

  const value = {
    addMessage: createEmit(socketEvents.newMessage),
    addChannel: createEmit(socketEvents.newChannel),
    removeChannel: createEmit(socketEvents.removeChannel),
    renameChannel: createEmit(socketEvents.renameChannel),
  };

  return (
    <socketContext.Provider value={value}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
