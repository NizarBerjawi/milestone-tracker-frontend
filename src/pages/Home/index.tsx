import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

import { TopMenu } from '../../components/TopMenu';
import { useAuth } from '../../context/AuthContext';

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

const Home: React.FC = (): React.ReactElement => {
  const { accessToken } = useAuth();
  const classes = useStyles();

  if (accessToken) {
    return <Redirect to='/dashboard' />;
  }

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
          <Typography variant='h1'>{process.env.APP_NAME}</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;