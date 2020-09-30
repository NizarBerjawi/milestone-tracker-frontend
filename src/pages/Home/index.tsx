import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../../context/AuthContext';
import Page from '../../components/Page';
import { Box } from '@material-ui/core';

const Home: React.FC = (): React.ReactElement => {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <Redirect to='/projects' />;
  }

  return (
    <Page hideSidebar={true}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100%'
      >
        <Typography variant='h1'>{process.env.APP_NAME}</Typography>
      </Box>
    </Page>
  );
};

export default Home;
