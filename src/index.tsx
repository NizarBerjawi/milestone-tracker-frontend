import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import { CssBaseline } from '@material-ui/core';

const rootEl = document.getElementById('root');

render(
  <Router>
    <CssBaseline />
    <App theme={theme} />
  </Router>,
  rootEl
);
