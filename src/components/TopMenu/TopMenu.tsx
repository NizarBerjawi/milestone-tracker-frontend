import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface TopMenuProps {
  title?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      top: 0,
      left: 0,
      marginBottom: theme.spacing(2)
    },
    action: {
      margin: theme.spacing(0.5),
      fontWeight: theme.typography.fontWeightBold,
    },
    signUp: {
      color: theme.palette.text.primary,
    },
    login: {
      color: theme.palette.text.secondary,
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: theme.palette.text.secondary,
      textDecoration: 'none',
    },
  })
);

const TopMenu: React.FC<TopMenuProps> = ({ title }: TopMenuProps) => {
  const classes = useStyles();
  const history = useHistory();

  const actions: ButtonProps[] = [
    {
      variant: 'outlined',
      children: 'Login',
      className: classes.login,
      onClick: (): void => history.push('/login'),
    },
    {
      variant: 'contained',
      children: 'Sign Up',
      className: classes.signUp,
      onClick: (): void => history.push('/register'),
    },
  ];

  return (
    <Box component='div' className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.link}>
              {title}
            </Link>
          </Typography>

          {actions.map(({ className, ...rest }: ButtonProps, index: number) => (
            <Button
              key={index}
              className={classNames(classes.action, className)}
              {...rest}
            />
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopMenu;
