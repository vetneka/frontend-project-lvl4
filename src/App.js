import React from 'react';

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Home, Login, NotFound } from './pages/index.js';

const App = () => {
  return (
    <>
      <Link to="/">Go to Home</Link>
      <Link to="/login">Go to Login</Link>
      <Link to="/notFound">Go to not found page</Link>

      <button class="btn btn-success">Test Button</button>

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
    </>
  );
};

export default App;