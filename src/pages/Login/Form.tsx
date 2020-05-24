import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ChangeEvent } from 'react';
import { TextField, Box } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import classNames from 'classnames';

interface FormProps {
  email: string;
  password: string;
  handleChange: (name: string, value: string) => void;
  handleSubmit: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      margin: theme.spacing(0.5),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

const Form = (props: FormProps): React.ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { email, password, handleChange, handleSubmit } = props;

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

      <Box display='flex' justifyContent='flex-end'>
        {actions.map(
          ({ className, children, ...rest }: ButtonProps, index: number) => (
            <Button
              key={index}
              className={classNames(classes.action, className)}
              {...rest}
            >
              {children}
            </Button>
          )
        )}
      </Box>
    </form>
  );
};

export default Form;
