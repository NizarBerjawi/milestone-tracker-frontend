import * as React from 'react';
import { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { TopMenu } from '../../components/TopMenu';
import Form from './Form';
import { authService } from '../../services';

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

type Credentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Register: React.FC = (): React.ReactElement => {
  const [credentials, setCredentials] = useState<Credentials>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const classes = useStyles();

  const handleChange = (name: string, value: string): void => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (): void => {
    authService.register(credentials).then((res) => console.log(res));
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
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
