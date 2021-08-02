import React from 'react';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

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

import store from './store.js';

import { Home, Login, SignUp, NotFound } from './pages/index.js';
import { Header, Main, Footer } from './components/index.js';

import { authContext, socketContext } from './contexts/index.js';

import { actions as channelsInfoActions } from './slices/channelsInfoSlice.js';
import { actions as messagesInfoActions } from './slices/messagesInfoSlice.js';

import { useAuth } from './hooks/index.js';

import getAuthInfo from './getAuthInfo';

const AuthProvider = ({ children }) => {
  const authInfo = getAuthInfo();

  const [loggedIn, setLoggedIn] = React.useState(!!authInfo.token);

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

const App = ({ socketClient, i18nInstance, rollbarConfig }) => {
  return (
    <Router>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryPage}>
          <Provider store={store}>
            <SocketProvider socket={socketClient}>
              <AuthProvider>
                <I18nextProvider i18n={i18nInstance}>
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
                </I18nextProvider>
              </AuthProvider>
            </SocketProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </Router>
  );
};

export default App;
