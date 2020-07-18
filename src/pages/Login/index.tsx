import * as React from 'react';
import { useState, FormEvent, MouseEvent } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { LoginCredentials } from '../../common/types';
import { useAuth } from '../../context/AuthContext';
import { login, LoginResponse } from '../../services/authService';
import Errors from '../../utils/Errors';
import Page from '../../components/Page';
import Form from './form';

const SIDEBAR_WIDTH = 240;

const Login: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>(new Errors());
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const { accessToken, setAccessToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

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

  const handleResendEmail = (e: MouseEvent): void => {
    e.preventDefault();

    history.push('/verify/send');
  };

  const handleBack = (): void => history.push('/');

  if (accessToken) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Page sidebarWidth={SIDEBAR_WIDTH} hideSidebar={true}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100%'
      >
        <Box m={4} maxWidth={480} width='100%'>
          <Typography variant='h4' component='h1'>
            Log in to {process.env.APP_NAME}
          </Typography>

          <Form
            {...credentials}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
            handleResendEmail={handleResendEmail}
            submitting={loading}
            errors={errors}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default Login;
