// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { io } from 'socket.io-client';

import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

import initSocketApi from './initSocketApi';

import store from './store';

import SocketProvider from './providers/SocketProvider.jsx';

import NotFound from './pages/NotFound.jsx';

import App from './App.jsx';

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

  const socketApi = initSocketApi(socketClient, store);

  await i18n.use(initReactI18next).init({
    lng: defaultLocale,
    debug: false,
    resources,
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryPage}>
        <StoreProvider store={store}>
          <SocketProvider api={socketApi}>
            <App />
          </SocketProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
