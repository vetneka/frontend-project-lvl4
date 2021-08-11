// @ts-check

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { io } from 'socket.io-client';

import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

import store from './store';
import { actions as channelsInfoActions } from './slices/channelsInfoSlice';
import { actions as messagesInfoActions } from './slices/messagesInfoSlice';

import { socketContext } from './contexts';

import NotFound from './pages/NotFound.jsx';

import App from './App.jsx';

const SocketProvider = ({ socket, children }) => {
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

  socket.on('newMessage', (message) => {
    store.dispatch(messagesInfoActions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsInfoActions.addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsInfoActions.removeChannel(id));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(channelsInfoActions.renameChannel(channel));
  });

  return (
    <socketContext.Provider value={{ socket, acknowledgeWithTimeout }}>
      {children}
    </socketContext.Provider>
  );
};

const ErrorBoundaryPage = () => <NotFound />;

const init = async (socketClient = io()) => {
  const rollbarConfig = {
    enabled: process.env.NODE_ENV === 'production',
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
      client: {
        javascript: {
          source_map_enabled: true,
          code_version: '0.0.1',
          guess_uncaught_frames: true,
        },
      },
    },
  };

  const defaultLocale = 'ru';

  await i18n.use(initReactI18next).init({
    lng: defaultLocale,
    debug: false,
    resources,
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryPage}>
        <StoreProvider store={store}>
          <SocketProvider socket={socketClient}>
            <App />
          </SocketProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
