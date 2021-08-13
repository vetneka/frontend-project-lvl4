import React, { useState } from 'react';


import '../assets/application.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';

import Header from './components/Header.jsx';
import MainContainer from './components/MainContainer.jsx';
import Footer from './components/Footer.jsx';

import { authContext } from './contexts';

import { useAuth } from './hooks';

import getAuthInfo from './getAuthInfo';

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(() => getAuthInfo());
  const loggedIn = !!authInfo?.token;

  const history = useHistory();
  const location = useLocation();

  const logIn = (data) => {
    const { from } = location.state || { from: { pathname: '/' } };

    localStorage.setItem('userId', JSON.stringify(data));
    setAuthInfo(data);
    history.replace(from);
  };

  const logOut = () => {
    const { from } = location.state || { from: { pathname: '/login' } };

    localStorage.removeItem('userId');
    setAuthInfo(null);
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
        (authInfo?.token)
          ? children
          : <Redirect to="/login" />
      }
    </Route>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
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
    </AuthProvider>
  </Router>
);

export default App;
