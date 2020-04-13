import * as React from 'react';
import { render } from 'react-dom';
import App from './Components/App';

const rootEl = document.getElementById('root');

render(<App name={'Nizar test'} />, rootEl);
