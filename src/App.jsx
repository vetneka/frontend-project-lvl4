import React from 'react';

import {
  Switch,
  Route,
  Redirect,
  useLocation, useHistory,
} from 'react-router-dom';

import './i18n';

import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';

import { Provider } from 'react-redux';

import { io } from 'socket.io-client';
import store from './store.js';

import {
  Home, Login, SignUp, NotFound,
} from './pages/index.js';
import { Header, Main, Footer } from './components/index.js';
import { authContext, socketContext } from './contexts/index.js';

import { addChannel, removeChannel, renameChannel } from './slices/channelsInfoSlice.js';
import { addMessage } from './slices/messagesInfoSlice.js';
import { useAuth } from './hooks/index.js';

const getAuthedUser = () => {
  const authedUser = localStorage.getItem('userId');
  return (authedUser)
    ? JSON.parse(authedUser)
    : {};
};

const AuthProvider = ({ children }) => {
  const authedUser = getAuthedUser();

  const [loggedIn, setLoggedIn] = React.useState(!!authedUser.token);

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
      authedUser, loggedIn, logIn, logOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const { authedUser } = useAuth();

  return (
    <Route path={path}>
      {
        (authedUser.token)
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
    store.dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });

  return (
    <socketContext.Provider value={{ socket, acknowledgeWithTimeout }}>
      {children}
    </socketContext.Provider>
  );
};

const ErrorBoundaryPage = () => <NotFound />;

const App = (socketClient = io()) => {
  const rollbarConfig = {
    accessToken: "f9608de6d0864fa88ad84bbc5b90d869",
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

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryPage}>
        <Provider store={store}>
          <SocketProvider socket={socketClient}>
            <AuthProvider>
              <Header />

              <Main>
                <Switch>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/signup">
                    <SignUp />
                  </Route>
                  <PrivateRoute exact path="/">
                    <Home />
                  </PrivateRoute>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </Main>

              <Footer />
            </AuthProvider>
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
