import * as React from 'react';
import { hot } from 'react-hot-loader';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

export interface AppProps {
  name: string;
}

const App = ({ name }: AppProps): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <Box component='h1' color={theme.palette.primary}>Hello {name}!</Box>
  </ThemeProvider>
);

declare let module: object;

export default hot(module)(App);
