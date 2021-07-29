// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDOM from 'react-dom';

import App from './App.jsx';

App().then((vdom) => {
  ReactDOM.render(
    vdom,
    document.getElementById('chat'),
  );
});
