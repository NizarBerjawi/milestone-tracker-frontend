import * as React from 'react';
import { useState } from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider, Theme } from '@material-ui/core';
import SnackbarProvider from './SnackbarProvider';

import { Router } from './Router';
import { UserInterface } from '../common/types';
import { AuthContext } from '../context/AuthContext';

interface AppProps {
  theme?: Theme;
}

const App = ({ theme }: AppProps): React.ReactElement => {
  const existingToken = localStorage.getItem('access_token');
  const [accessToken, setAccessToken] = useState<string>(existingToken);
  const [user, setUser] = useState<UserInterface>({
    email: '',
    profile: {
      firstName: '',
      lastName: ''
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
          <Router />
        </AuthContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

declare let module: object;

export default hot(module)(App);
