import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button, { ButtonProps } from '../Button';
import classNames from 'classnames';

interface FormActionsProps {
  actions: ButtonProps[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      margin: theme.spacing(0.5),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

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
