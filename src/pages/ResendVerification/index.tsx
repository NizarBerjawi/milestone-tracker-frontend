import * as React from 'react';
import { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useAuth } from '../../context/AuthContext';
import { resendVerification, VerificationResponse } from '../../services/authService';
import Errors from '../../utils/Errors';
import Form from './form';
import { useStyles } from './styles';

const Login: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>(new Errors());
  const [email, setEmail] = useState<string>('');

  const { accessToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

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
          <Paper elevation={3} className={classes.card}>
            <Box m={4}>
              <Box m={2}>
                <Typography align='center' variant='h5' component='h1'>
                  Resend Verification Email
                </Typography>
              </Box>

              <Form
                email={email}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
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
