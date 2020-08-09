import * as React from 'react';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { TextField, Box, Link } from '@material-ui/core';

import { ButtonProps } from '../../components/Button';
import FormActions from '../../components/FormActions';
import Errors from '../../utils/Errors';

interface FormProps {
  email: string;
  password: string;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  handleResendEmail: (e: MouseEvent) => void;
  handleBack: (e: MouseEvent) => void;
  submitting: boolean;
  errors: Errors;
}

const Form = (props: FormProps): React.ReactElement => {
  const {
    errors,
    email,
    password,
    submitting,
    handleChange,
    handleSubmit,
    handleBack,
    handleResendEmail,
  } = props;

  const actions: ButtonProps[] = [
    {
      variant: 'outlined',
      children: 'Back',
      size: 'large',
      color: 'secondary',
      onClick: handleBack,
    },
    {
      variant: 'contained',
      children: 'Login',
      size: 'large',
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
        autoComplete='on'
      />

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
        autoComplete='off'
      />

      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Box component='span'>
          Haven&apos;t received your confirmation email yet?
          <Box component='span' ml={0.5}>
            <Link href='#' onClick={handleResendEmail}>
              Resend Email.
            </Link>
          </Box>
        </Box>

        <FormActions actions={actions} />
      </Box>
    </form>
  );
};

export default Form;
