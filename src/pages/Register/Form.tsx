import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { TextField } from '@material-ui/core';
import FormActions from '../../components/FormActions';
import { ButtonProps } from '../../components/Button';

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  loading: boolean;
}

const Form = (props: FormProps): React.ReactElement => {
  const history = useHistory();
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    handleChange,
    handleSubmit,
    loading,
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
      disabled: loading,
      loading: loading,
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
        type='text'
        label='First Name'
        name='firstName'
        value={firstName}
        variant='outlined'
        margin='normal'
        fullWidth
        onChange={onChange}
      />

      <TextField
        type='text'
        label='Last Name'
        name='lastName'
        value={lastName}
        variant='outlined'
        margin='normal'
        fullWidth
        onChange={onChange}
      />

      <TextField
        type='email'
        label='Email'
        name='email'
        value={email}
        variant='outlined'
        margin='normal'
        fullWidth
        onChange={onChange}
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
      />

      <TextField
        type='password'
        label='Confirm Password'
        name='passwordConfirm'
        value={passwordConfirm}
        variant='outlined'
        margin='normal'
        fullWidth
        onChange={onChange}
      />

      <FormActions actions={actions} />
    </form>
  );
};

export default Form;
