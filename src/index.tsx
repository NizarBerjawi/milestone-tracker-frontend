import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';

const rootEl = document.getElementById('root');

render(
  <Router>
    <App theme={theme}/>
  </Router>,
  rootEl
);
