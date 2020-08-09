import * as React from 'react';
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import { Box, CircularProgress } from '@material-ui/core';

import { useStyles } from './styles';

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = (
  props: React.PropsWithChildren<ButtonProps>
) => {
  const { children, loading, ...rest } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <MuiButton {...rest}>{children}</MuiButton>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Box>
    </Box>
  );
};

export default Button;
