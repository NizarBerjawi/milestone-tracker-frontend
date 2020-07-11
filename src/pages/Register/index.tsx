import * as React from 'react';
import { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import Form from './form';
import { register, RegisterResponse } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { RegisterCredentials } from '../../common/types';
import { useStyles } from './styles';
import Errors from '../../utils/Errors';

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
  const classes = useStyles();
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
    <Box component='div' className={classes.page}>
      <Container maxWidth='sm' className={classes.container}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='100%'
        >
          <Paper variant='outlined' elevation={2}>
            <Box margin={2}>
              <Typography variant='h3'>Sign Up</Typography>
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
      </Container>
    </Box>
  );
};

export default Register;
