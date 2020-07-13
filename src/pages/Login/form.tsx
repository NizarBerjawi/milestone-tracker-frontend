import * as React from 'react';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, TextField, Link } from '@material-ui/core';

import { ButtonProps } from '../../components/Button';
import FormActions from '../../components/FormActions';
import Errors from '../../utils/Errors';

interface FormProps {
  email: string;
  password: string;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  handleSendVerification: (e: MouseEvent) => void;
  showVerify: boolean;
  submitting: boolean;
  errors: Errors;
}

const Form = (props: FormProps): React.ReactElement => {
  const history = useHistory();
  const {
    errors,
    email,
    password,
    submitting,
    showVerify,
    handleChange,
    handleSubmit,
    handleSendVerification
  } = props;

  const actions: ButtonProps[] = [
    {
      variant: 'contained',
      children: 'Cancel',
      color: 'secondary',
      onClick: (): void => history.push('/'),
    },
    {
      variant: 'contained',
      children: 'Login',
      color: 'primary',
      disabled: submitting,
      loading: submitting,
      type: 'submit',
    },
  ];

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    handleChange(name, value);
  };

  return (
    <React.Fragment>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          type='email'
          label='Email'
          name='email'
          value={email}
          variant='outlined'
          margin='normal'
          fullWidth
          onChange={onChange}
          error={errors.has('email')}
          helperText={errors.first('email')}
        />

        {!showVerify &&
          <TextField
            type='password'
            label='Password'
            name='password'
            value={password}
            variant='outlined'
            margin='normal'
            fullWidth
            onChange={onChange}
            error={errors.has('password')}
            helperText={errors.first('password')}
          />
        }

        <FormActions actions={actions} />
      </form>

      <Box display='flex' justifyContent='flex-start'>
        <Link href='#' onClick={handleSendVerification}>
          Resend Verification Email
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default Form;
