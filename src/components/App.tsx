import * as React from 'react';
import { useState } from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider, Theme } from '@material-ui/core';
import SnackbarProvider from './SnackbarProvider';

import { Router } from './Router';
import { AuthContext } from '../context/AuthContext';

interface AppProps {
  theme?: Theme;
}

const App = ({ theme }: AppProps): React.ReactElement => {
  const existingToken = JSON.parse(localStorage.getItem('access_token'));
  const [accessToken, setAccessToken] = useState<string>(existingToken);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            <Router />
          </AuthContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

declare let module: object;

export default hot(module)(App);
