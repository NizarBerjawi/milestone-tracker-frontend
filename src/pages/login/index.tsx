import * as React from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Login: React.FC = (): React.ReactElement => (
  <React.Fragment>
    <Box component='h1'>LOGIN</Box>
    <Link to='/'>Go to Home</Link>
    <br />
    <Link to='/register'>Register</Link>
  </React.Fragment>
);

export default Login;
