import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { ButtonProps } from '../../components/Button';
import FormActions from '../../components/FormActions';
import Errors from '../../utils/Errors';

interface FormProps {
  email: string;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  submitting: boolean;
  errors: Errors;
}

const Form = (props: FormProps): React.ReactElement => {
  const history = useHistory();
  const { errors, email, submitting, handleChange, handleSubmit } = props;

  const actions: ButtonProps[] = [
    {
      variant: 'contained',
      children: 'Back',
      size: 'large',
      color: 'secondary',
      onClick: (): void => history.push('/login'),
    },
    {
      variant: 'contained',
      children: 'Resend',
      color: 'primary',
      size: 'large',
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
    <form noValidate autoComplete='off' onSubmit={handleSubmit} style={{width: '100%'}}>
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

      <FormActions actions={actions} />
    </form>
  );
};

export default Form;
