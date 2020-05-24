import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import FormActions from '../../components/FormActions';

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  handleChange: (name: string, value: string) => void;
  handleSubmit: () => void;
}

const Form = (props: FormProps): React.ReactElement => {
  const history = useHistory();
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    handleChange,
    handleSubmit,
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
      onClick: handleSubmit,
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
        name='password_confirm'
        value={passwordConfirmation}
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
