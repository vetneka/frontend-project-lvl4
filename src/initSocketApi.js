import { actions as channelsInfoActions } from './slices/channelsInfoSlice.js';
import { actions as messagesInfoActions } from './slices/messagesInfoSlice.js';

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

const initSocketApi = (socket, store) => {
  const createEmit = (event) => (message, onSuccess, onTimeout) => {
    socket.emit(event, message, acknowledgeWithTimeout(onSuccess, onTimeout, ackTimeout));
  };

  socket.on(socketEvents.newMessage, (message) => {
    store.dispatch(messagesInfoActions.sendMessage(message));
  });

  socket.on(socketEvents.newChannel, (channel) => {
    store.dispatch(channelsInfoActions.createChannel(channel));
  });

  socket.on(socketEvents.removeChannel, ({ id }) => {
    store.dispatch(channelsInfoActions.removeChannel(id));
  });

  socket.on(socketEvents.renameChannel, (channel) => {
    store.dispatch(channelsInfoActions.renameChannel(channel));
  });

  return {
    sendMessage: createEmit(socketEvents.newMessage),
    createChannel: createEmit(socketEvents.newChannel),
    removeChannel: createEmit(socketEvents.removeChannel),
    renameChannel: createEmit(socketEvents.renameChannel),
  };
};

export default initSocketApi;
