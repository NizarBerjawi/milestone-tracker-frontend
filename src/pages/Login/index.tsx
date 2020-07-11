import * as React from 'react';
import { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import Form from './form';
import { LoginCredentials } from '../../common/types';
import { useAuth } from '../../context/AuthContext';
import { login, LoginResponse } from '../../services/authService';
import Errors from '../../utils/Errors';
import { useStyles } from './styles';

const Login: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const { accessToken, setAccessToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>(new Errors());
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (name: string, value: string): void => {
    setCredentials({ ...credentials, [name]: value });

    errors.clear(name);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setLoading(true);

    login(credentials)
      .then((res: LoginResponse) => {
        setAccessToken(res.accessToken);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setErrors(new Errors(err.errors));
        setLoading(false);
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
                errors={errors}
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
