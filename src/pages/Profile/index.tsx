import * as React from 'react';
import { useEffect, useState, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Typography, useTheme } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack';

import { PersonalDetails, ResponseWithMessage } from '../../common/types';
import { postProfile } from '../../services/profileService';
import { useAuth } from '../../context/AuthContext';
import Page from '../../components/Page';
import Errors from '../../utils/Errors';
import Form from './form';

const Profile: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>(new Errors());
  const [redirect, setRedirect] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: '',
    lastName: '',
  });

  const theme = useTheme();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user.email && user.profile) {
      setRedirect(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    setLoading(true);

    postProfile(personalDetails)
      .then((res: ResponseWithMessage<PersonalDetails>) => {
        enqueueSnackbar(res.message, { variant: 'success' });
        setLoading(false);

        if (res.data) {
          setRedirect(true);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setErrors(new Errors(err.errors));
        setLoading(false);
      });
  };

  const handleChange = (name: string, value: string): void => {
    setPersonalDetails({ ...personalDetails, [name]: value });

    errors.clear(name);
  };

  if (redirect) {
    return <Redirect to='/projects' push />;
  }

  return (
    <Page hideSidebar={true}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100%'
      >
        <Box m={2} p={2} maxWidth={theme.breakpoints.width('sm')} width='100%'>
          <Typography variant='h4' component='h1'>
            Let&apos;s get you started!
          </Typography>

          <Box mt={2}>
            <Alert severity='info'>
              We need to collect your full name so that people who will work
              with you can know you.
            </Alert>
          </Box>

          <Form
            personalDetails={personalDetails}
            handleChange={(name: string, value: string): void =>
              handleChange(name, value)
            }
            handleSubmit={(e: FormEvent): void => handleSubmit(e)}
            submitting={loading}
            errors={errors}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default Profile;
