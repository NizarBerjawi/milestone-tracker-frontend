import * as React from 'react';
import { useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { ProfileInterface, ResponseWithMessage } from '../../common/types';
import { postProfile } from '../../services/profileService';
import Page from '../../components/Page';
import Errors from '../../utils/Errors';
import Form from './form';

const sidebarWidth = 240;

const Profile: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>(new Errors());
  const [redirect, setRedirect] = useState(false);
  const [profile, setProfile] = useState<ProfileInterface>({
    firstName: '',
    lastName: '',
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (name: string, value: string): void => {
    setProfile({ ...profile, [name]: value });

    errors.clear(name);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setLoading(true);

    postProfile(profile)
      .then((res: ResponseWithMessage<ProfileInterface>) => {
        enqueueSnackbar(res.message, { variant: 'success' });
        setLoading(false);

        if (res.data) {
          setRedirect(true)
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setErrors(new Errors(err.errors));
        setLoading(false);
      });
  };

  if (redirect) {
    return <Redirect to='/dashboard' push />;
  }

  return (
    <Page sidebarWidth={sidebarWidth}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100%'
      >
        <Box m={4} maxWidth={480} width='100%'>
          <Typography variant='h4' component='h1'>
            Welcome to {process.env.APP_NAME}!
          </Typography>

          <Form
            {...profile}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitting={loading}
            errors={errors}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default Profile;
