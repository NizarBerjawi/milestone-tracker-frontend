import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button, { ButtonProps } from '../Button';
import classNames from 'classnames';
import { useStyles } from './styles';

interface FormActionsProps {
  actions: ButtonProps[];
}

const FormActions = ({ actions }: FormActionsProps): React.ReactElement => {
  const classes = useStyles();

  return (
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
  );
};

export default FormActions;
