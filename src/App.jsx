import React from 'react';

import '../assets/application.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AuthProvider from './providers/AuthProvider.jsx';

import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';

import Header from './components/Header.jsx';
import MainContainer from './components/MainContainer.jsx';
import Footer from './components/Footer.jsx';

import { useAuth } from './hooks';

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
