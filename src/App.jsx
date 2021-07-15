import React from 'react';

import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import { io } from 'socket.io-client';
import store from './store.js';

import {
  Home, Login, SignUp, NotFound,
} from './pages/index.js';
import { Header, Main, Footer } from './components/index.js';
import { AuthContext, SocketContext } from './contexts/index.js';
import { addMessage } from './slices/messagesInfoSlice.js';

const checkUserToken = () => JSON.parse(localStorage.getItem('userId'));

const AuthProvider = ({ children }) => {
  const logIn = async (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
  };

  const logOut = () => {
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => (
  <Route path={path}>
    {
        (checkUserToken())
          ? children
          : <Redirect to="/login" />
      }
  </Route>
);

const SocketProvider = ({ children }) => {
  const socket = io();

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

  const sendMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      console.log('response.status', response.status);
    });
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, acknowledgeWithTimeout }}>
      {children}
    </SocketContext.Provider>
  );
};

const App = () => (
  <>
    <Provider store={store}>
      <SocketProvider>
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
  </>
);

export default App;
