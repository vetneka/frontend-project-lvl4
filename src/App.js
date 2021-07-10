import React from 'react';

import {
  Switch,
  Route,
} from "react-router-dom";

import { Home, Login, SignUp, NotFound } from './pages/index.js';
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
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Main>
      
      <Footer />
    </>
  );
};

export default App;