import * as React from 'react';
import { useState, FormEvent } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useAuth } from '../../context/AuthContext';
import {
  resendVerification,
  VerificationResponse,
} from '../../services/authService';
import Errors from '../../utils/Errors';
import Page from '../../components/Page';
import Form from './form';

const SIDEBAR_WIDTH = 240;

const Login: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>(new Errors());
  const [email, setEmail] = useState<string>('');

  const history = useHistory();
  const { accessToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (name: string, value: string): void => {
    setEmail(value);

    errors.clear(name);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setLoading(true);

    resendVerification(email)
      .then((res: VerificationResponse) => {
        enqueueSnackbar(res.message, { variant: 'success' });
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setErrors(new Errors(err.errors));
        setLoading(false);
      });
  };

  const handleBack = (): void => history.push('/login');

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
        <Box m={4} maxWidth={480} width={'100%'}>
          <Typography variant='h4' component='h1'>
            Resend Confirmation
          </Typography>

          <Form
            email={email}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
            submitting={loading}
            errors={errors}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default Login;
