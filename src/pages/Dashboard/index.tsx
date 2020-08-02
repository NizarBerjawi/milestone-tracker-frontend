import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Typography,
  Box,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import Page from '../../components/Page';
import { useStyles } from './styles';
import { fetchUser } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { UserInterface, ResponseWithoutMessage } from '../../common/types';

const sidebarWidth = 240;

const Dashboard: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const classes = useStyles();
  const { user, setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user.email && user.profile) {
      return setLoading(false);
    }

    fetchUser()
      .then((res: ResponseWithoutMessage<UserInterface>) => {
        setUser(res.data);
        setLoading(false);

        if (!res.data.profile) {
          setRedirect(true);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setLoading(false);
      });
  }, []);

  if (redirect) {
    return <Redirect to='/profiles/create' push />;
  }

  return (
    <Page sidebarWidth={sidebarWidth}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      {!loading && (
        <Box m={2}>
          <Typography variant='h1'>Dashboard</Typography>
        </Box>
      )}
    </Page>
  );
};

export default Dashboard;
