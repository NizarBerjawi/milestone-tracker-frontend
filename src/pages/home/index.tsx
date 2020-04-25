import * as React from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Login: React.FC = (): React.ReactElement => (
  <React.Fragment>
    <Box component='h1'>HOME</Box>
    <Link to='/login'>Login</Link>
  </React.Fragment>
);

export default Login;
