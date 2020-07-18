import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { useAuth } from '../../context/AuthContext';
import Button from '../Button';
import { useStyles } from './styles';

export interface TopMenuProps {
  title?: string;
  hideIcon?: boolean;
  sidebarWidth?: number;
  openSidebar?: boolean;
  loggingOut?: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick: () => void;
  onSidebarOpen: () => void;
}

const TopMenu: React.FC<TopMenuProps> = (props: TopMenuProps) => {
  const classes = useStyles(props);
  const { accessToken } = useAuth();

  return (
    <AppBar
      position='fixed'
      className={classNames(classes.appBar, {
        [classes.appBarShift]: props.openSidebar,
      })}
      elevation={0}
    >
      <Toolbar>
        {!props.hideIcon && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={props.onSidebarOpen}
            edge='start'
            className={classNames(classes.menuButton, {
              [classes.hide]: props.openSidebar,
            })}
          >
            <MenuIcon color='primary' />
          </IconButton>
        )}
        <Typography variant='h6' className={classes.title}>
          <Link to='/' className={classes.link}>
            {props.title}
          </Link>
        </Typography>

        {!accessToken && (
          <React.Fragment>
            <Button
              variant='outlined'
              size='large'
              color='secondary'
              className={classNames(classes.action)}
              onClick={props.onLoginClick}
            >
              Login
            </Button>
            <Button
              variant='outlined'
              size='large'
              color='primary'
              className={classNames(classes.action)}
              onClick={props.onRegisterClick}
            >
              Sign Up
            </Button>
          </React.Fragment>
        )}

        {accessToken && (
          <Button
            variant='contained'
            size='large'
            className={classNames(classes.action)}
            onClick={props.onLogoutClick}
            loading={props.loggingOut}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
