import * as React from 'react';
import { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { RegisterCredentials } from '../../common/types';
import { useAuth } from '../../context/AuthContext';
import { register, RegisterResponse } from '../../services/authService';
import Errors from '../../utils/Errors';
import Page from '../../components/Page';
import Form from './form';

const SIDEBAR_WIDTH = 240;

const Register: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>(new Errors());
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const { enqueueSnackbar } = useSnackbar();
  const { accessToken } = useAuth();

  const handleChange = (name: string, value: string): void => {
    setCredentials({ ...credentials, [name]: value });

    errors.clear(name);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setLoading(true);

    register(credentials)
      .then((res: RegisterResponse) => {
        enqueueSnackbar(res.message, { variant: 'success' });
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
    <Page sidebarWidth={SIDEBAR_WIDTH} hideSidebar={true}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100%'
      >
        <Box m={4} maxWidth={480} width='100%'>
          <Typography variant='h4' component='h1'>
            Create a free {process.env.APP_NAME} account
          </Typography>

          <Form
            {...credentials}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitting={loading}
            errors={errors}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default Register;
