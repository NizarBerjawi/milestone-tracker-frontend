import * as React from 'react';
import { useState, FormEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import Form from './Form';
import { authService } from '../../services';
import { RegisterCredentials } from '../../common/types';

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

const Register: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const classes = useStyles();

  const handleChange = (name: string, value: string): void => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setLoading(true);

    authService
      .register(credentials)
      .then(() => setLoading(false));
  };

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
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
