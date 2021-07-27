// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';

ReactDOM.render(
  <Router>
    {App()}
  </Router>,
  document.getElementById('chat'),
);
