import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { TopMenu } from '../../components/TopMenu';
import Form from './Form';
import { useState } from 'react';

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
  email: string;
  password: string;
}

const Login: React.FC = (): React.ReactElement => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const classes = useStyles();

  const handleChange = (name: string, value: string): void => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (): void => {
    return;
  };

  return (
    <Box component='div' className={classes.page}>
      <TopMenu title={process.env.APP_NAME} />

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
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
