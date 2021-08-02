import React, { useState } from 'react';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';

import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';

import { Provider } from 'react-redux';

import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';

import Header from './components/Header.jsx';
import MainContainer from './components/MainContainer.jsx';
import Footer from './components/Footer.jsx';

import { authContext, socketContext } from './contexts';

import store from './store';
import { actions as channelsInfoActions } from './slices/channelsInfoSlice';
import { actions as messagesInfoActions } from './slices/messagesInfoSlice';

import { useAuth } from './hooks';

import getAuthInfo from './getAuthInfo';

const AuthProvider = ({ children }) => {
  const authInfo = getAuthInfo();

  const [loggedIn, setLoggedIn] = useState(!!authInfo.token);

  const history = useHistory();
  const location = useLocation();

  const logIn = (data) => {
    const { from } = location.state || { from: { pathname: '/' } };

    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(true);
    history.replace(from);
  };

  const logOut = () => {
    const { from } = location.state || { from: { pathname: '/login' } };
    localStorage.removeItem('userId');
    setLoggedIn(false);
    history.push(from);
  };

  return (
    <authContext.Provider value={{
      authInfo, loggedIn, logIn, logOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const { authInfo } = useAuth();

  return (
    <Route path={path}>
      {
        (authInfo.token)
          ? children
          : <Redirect to="/login" />
      }
    </Route>
  );
};

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

const App = ({ socketClient, i18nInstance, rollbarConfig }) => (
  <Router>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryPage}>
        <Provider store={store}>
          <SocketProvider socket={socketClient}>
            <AuthProvider>
              <I18nextProvider i18n={i18nInstance}>
                <Header />

                <MainContainer>
                  <Switch>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route path="/signup">
                      <SignUp />
                    </Route>
                    <PrivateRoute exact path="/">
                      <Chat />
                    </PrivateRoute>
                    <Route path="*">
                      <NotFound />
                    </Route>
                  </Switch>
                </MainContainer>

                <Footer />
              </I18nextProvider>
            </AuthProvider>
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </Router>
);

export default App;
