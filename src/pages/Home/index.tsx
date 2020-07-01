import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { useAuth } from '../../context/AuthContext';
import Page from '../../components/Page';

const Home: React.FC = (): React.ReactElement => {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Page sidebarWidth={240} hideSidebar={true}>
      <Typography variant='h1'>{process.env.APP_NAME}</Typography>
    </Page>
  );
};

export default Home;
