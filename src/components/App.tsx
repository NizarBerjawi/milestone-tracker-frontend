import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider, Theme } from '@material-ui/core';
import { Router } from './Router';

interface AppProps {
  theme?: Theme;
}

const App = ({ theme }: AppProps): React.ReactElement => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.Fragment>
);

declare let module: object;

export default hot(module)(App);
