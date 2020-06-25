import * as React from 'react';
import { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Paper, Typography } from '@material-ui/core';

import Form from './Form';
import { LoginCredentials } from '../../common/types';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services';
import { LoginResponse } from '../../services/authService';

const useStyles = makeStyles(() =>
  createStyles({
    page: {
      height: '100vh',
    },
    container: {
      height: '100%',
    },
  })
);

const Login: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const { accessToken, setAccessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (name: string, value: string): void => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setLoading(true);

    authService.login(credentials)
      .then((res: LoginResponse) => {
        setAccessToken(res.accessToken);
        setLoading(false)
      });
  };

  if (accessToken) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Box component='div' className={classes.page}>
      <Container maxWidth='sm' className={classes.container}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='100%'
          >
          <Paper elevation={2}>
            <Box margin={2}>
              <Typography variant='h3'>Login</Typography>
              <Form
                {...credentials}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                submitting={loading}
                />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
