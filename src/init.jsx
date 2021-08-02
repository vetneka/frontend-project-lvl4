// @ts-check

import React from 'react';

import { io } from 'socket.io-client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

import App from './App.jsx';

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
  const i18nInstance = i18n.createInstance();

  await i18nInstance.use(initReactI18next).init({
    lng: defaultLocale,
    debug: false,
    resources,
  });

  return (
    <App
      socketClient={socketClient}
      i18nInstance={i18nInstance}
      rollbarConfig={rollbarConfig}
    />
  );
};

export default init;
