import * as React from 'react';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { TextField } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';

import { PersonalDetails } from '../../common/types';
import  { ButtonProps } from '../../components/Button';
import FormActions from '../../components/FormActions';
import Errors from '../../utils/Errors';

interface FormProps {
  personalDetails?: PersonalDetails;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  submitting: boolean;
  errors: Errors;
}

const Form = (props: FormProps): React.ReactElement => {
  const {
    errors,
    personalDetails,
    submitting,
    handleChange,
    handleSubmit,
  } = props;

  const actions: ButtonProps[] = [
    {
      variant: 'contained',
      children: 'Save',
      size: 'large',
      color: 'primary',
      disabled: submitting,
      loading: submitting,
      type: 'submit',
    }
  ];

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    handleChange(name, value);
  };

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          type='text'
          label='First Name'
          name='firstName'
          value={personalDetails.firstName}
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
          value={personalDetails.lastName}
          variant='outlined'
          margin='normal'
          fullWidth
          onChange={onChange}
          error={errors.has('lastName')}
          helperText={errors.first('lastName')}
          />
      </FormGroup>

      <FormActions actions={actions} />
    </form>
  );
};

export default Form;
