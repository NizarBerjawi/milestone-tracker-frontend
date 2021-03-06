import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import * as qs from 'qs';
import { useTheme } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  Zoom,
} from '@material-ui/core';

import { useAuth } from '../../context/AuthContext';
import { RouteComponentInterface } from '../../common/types';
import { verify, VerificationResponse } from '../../services/authService';
import { ButtonProps } from '../../components/Button';
import FormActions from '../../components/FormActions';
import { useStyles } from './styles';
import Page from '../../components/Page';

const Verify: React.FC<RouteComponentInterface> = (
  props: RouteComponentInterface
) => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState('');

  const { accessToken } = useAuth();
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const queryStrings = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });

    const signedUrl = queryStrings.signedUrl.toString();

    setTimeout(() => {
      verify(signedUrl)
        .then((res: VerificationResponse) => {
          setMessage(res.message);
          setLoading(false);
          setVerified(true);
        })
        .catch((err) => {
          setMessage(err.message);
          setLoading(false);
          setVerified(false);
        });
    }, 2000);
  }, []);

  const actions: ButtonProps[] = [
    {
      variant: 'contained',
      children: 'Login',
      size: 'large',
      color: 'primary',
      onClick: (): void => history.push('/login'),
    },
  ];

  if (accessToken) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Backdrop className={classes.backdrop} open={true}>
      {loading && !verified && <CircularProgress color='inherit' />}

      {!loading && (
        <Page hideSidebar={true}>
          {verified && (
            <Zoom in={true}>
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                textAlign='center'
              >
                <CheckCircleIcon
                  className={classes.icon}
                  htmlColor={theme.palette.success.main}
                />

                <Box mb={2}>
                  <Typography variant='h4' component='h1'>
                    {message}
                  </Typography>
                </Box>

                <FormActions actions={actions} />
              </Box>
            </Zoom>
          )}

          {!verified && (
            <Zoom in={true}>
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                textAlign='center'
              >
                <ErrorIcon
                  className={classes.icon}
                  htmlColor={theme.palette.error.main}
                />

                <Box mb={2}>
                  <Typography variant='h4' component='h1'>
                    {message}
                  </Typography>
                </Box>

                <FormActions actions={actions} />
              </Box>
            </Zoom>
          )}
        </Page>
      )}
    </Backdrop>
  );
};

export default Verify;
