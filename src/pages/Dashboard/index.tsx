import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

import { TopMenu } from '../../components/TopMenu';

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

const Dashboard: React.FC = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.page}>
      <Container maxWidth='sm' className={classes.container}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='100%'
        >
          <Typography variant='h1'>Dashboard</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
