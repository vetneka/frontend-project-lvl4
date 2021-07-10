import React from 'react';

import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Home, Login, SignUp, NotFound } from './pages/index.js';
import { Header, Main, Footer } from './components/index.js';
import AuthContext from './contexts/index.js';

const checkUserToken = () => JSON.parse(localStorage.getItem('userId'));

const AuthProvider = ({ children }) => {
  const logIn = (data) => {
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

const PrivateRoute = ({ children, path }) => {
  const auth = React.useContext(AuthContext);

  return (
    <Route path={path}>
      {
        (checkUserToken())
          ? children
          : <Redirect to="/login" />
      }
    </Route>
  );
};

const App = () => {
  return (
    <>
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
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Main>
        
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;