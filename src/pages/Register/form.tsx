import * as React from 'react';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { TextField } from '@material-ui/core';
import FormActions from '../../components/FormActions';
import { ButtonProps } from '../../components/Button';
import Errors from '../../utils/Errors';

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  handleBack: (e: MouseEvent) => void;
  submitting: boolean;
  errors: Errors;
}

const Form = (props: FormProps): React.ReactElement => {
  const {
    email,
    password,
    passwordConfirmation,
    handleChange,
    handleSubmit,
    handleBack,
    submitting,
    errors,
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
      children: 'Register',
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
      />

      <TextField
        type='password'
        label='Confirm Password'
        name='passwordConfirmation'
        value={passwordConfirmation}
        variant='outlined'
        margin='normal'
        fullWidth
        onChange={onChange}
        error={errors.has('passwordConfirmation')}
        helperText={errors.first('passwordConfirmation')}
      />

      <FormActions actions={actions} />
    </form>
  );
};

export default Form;
