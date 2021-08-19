// @ts-check

import ReactDOM from 'react-dom';
import init from './init.jsx';

init().then((vdom) => {
  ReactDOM.render(
    vdom,
    document.getElementById('chat'),
  );
});
