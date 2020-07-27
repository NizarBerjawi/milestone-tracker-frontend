import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { TextField } from '@material-ui/core';

import { ButtonProps } from '../../components/Button';
import FormActions from '../../components/FormActions';
import Errors from '../../utils/Errors';

interface FormProps {
  firstName: string;
  lastName: string;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  submitting: boolean;
  errors: Errors;
}

const Form = (props: FormProps): React.ReactElement => {
  const {
    errors,
    firstName,
    lastName,
    submitting,
    handleChange,
    handleSubmit,
  } = props;

  const actions: ButtonProps[] = [
    {
      variant: 'contained',
      children: 'Submit',
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
        type='text'
        label='First Name'
        name='firstName'
        value={firstName}
        variant='outlined'
        margin='normal'
        fullWidth
        onChange={onChange}
        error={errors.has('firstName')}
        helperText={errors.first('firstName')}
      />

      <TextField
        type='lastName'
        label='Last Name'
        name='lastName'
        value={lastName}
        variant='outlined'
        margin='normal'
        fullWidth
        onChange={onChange}
        error={errors.has('lastName')}
        helperText={errors.first('lastName')}
      />

      <FormActions actions={actions} />
    </form>
  );
};

export default Form;
