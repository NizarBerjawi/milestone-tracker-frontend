import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { Router } from './router';

const App = (): React.ReactElement => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.Fragment>
);

declare let module: object;

export default hot(module)(App);
