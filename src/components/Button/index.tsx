import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -theme.spacing(1.5),
    marginLeft: -theme.spacing(1.5),
  },
}));

const Button: React.FC<ButtonProps> = (
  props: React.PropsWithChildren<ButtonProps>
) => {
  const classes = useStyles();
  const { children, loading, ...rest } = props;

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
