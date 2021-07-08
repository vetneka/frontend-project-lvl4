import React from 'react';

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Home, Login, NotFound } from './pages/index.js';
import { Header, Main, Footer } from './components/index.js';

const App = () => {
  return (
    <>
      <Header />

      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Main>
      
      <Footer />
      {/* <Link to="/">Go to Home</Link>
      <Link to="/login">Go to Login</Link>
      <Link to="/notFound">Go to not found page</Link> */}
    </>
  );
};

export default App;