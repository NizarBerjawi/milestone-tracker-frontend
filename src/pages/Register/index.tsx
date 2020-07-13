import * as React from 'react';
import { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { RegisterCredentials } from '../../common/types';
import { useAuth } from '../../context/AuthContext';
import { register, RegisterResponse } from '../../services/authService';
import Errors from '../../utils/Errors';
import Form from './form';
import { useStyles } from './styles';

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
  const classes = useStyles();

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
                  Sign up for your account
                </Typography>
              </Box>

              <Form
                {...credentials}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                errors={errors}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
