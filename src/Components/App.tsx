import * as React from 'react';
import { hot } from 'react-hot-loader';

export interface AppProps {
  name: string;
}

const App = ({ name }: AppProps): React.ReactElement => <h1>Hello {name}!</h1>;

declare let module: object;

export default hot(module)(App);
