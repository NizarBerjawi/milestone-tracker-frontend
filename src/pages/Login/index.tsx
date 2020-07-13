import * as React from 'react';
import { useState, FormEvent, MouseEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { LoginCredentials } from '../../common/types';
import { useAuth } from '../../context/AuthContext';
import { login, LoginResponse } from '../../services/authService';
import Errors from '../../utils/Errors';
import Form from './form';
import { useStyles } from './styles';

const Login: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>(new Errors());
  const [showVerify, setShowVerify] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const { accessToken, setAccessToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

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

  const handleSendVerification = (e: MouseEvent): void => {
    e.preventDefault();

    setShowVerify(true);
  }

  if (accessToken) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container maxWidth='sm' className={classes.container}>
      <Box className={classes.page}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='100%'
        >
          <Paper elevation={3}>
            <Box m={4}>
              <Box m={2}>
                <Typography align='center' variant='h5' component='h1'>
                  Log in to {process.env.APP_NAME}
                </Typography>
              </Box>

              <Form
                {...credentials}
                showVerify={showVerify}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleSendVerification={handleSendVerification}
                submitting={loading}
                errors={errors}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
