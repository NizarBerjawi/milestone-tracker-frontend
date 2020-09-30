import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';

import TopMenu from '../TopMenu';
import Sidebar from '../Sidebar';
import { useStyles } from './styles';
import { logout } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

interface PageProps {
  hideSidebar?: boolean;
  sidebarWidth?: number;
}

const DEFAULT_SIDEBAR_WIDTH = 240;

const Page: React.FC<PageProps> = (
  props: React.PropsWithChildren<PageProps>
) => {
  const [open, setOpen] = React.useState(false);
  const [loggingOut, setloggingOut] = React.useState(false);
  const sidebarWidth = props.sidebarWidth ?? DEFAULT_SIDEBAR_WIDTH;

  const classes = useStyles();
  const history = useHistory();
  const { setAccessToken, setUser } = useAuth();

  const onSidebarOpen = (): void => setOpen(true);

  const handleDrawerClose = (): void => setOpen(false);

  const onLogoutClick = (): void => {
    setloggingOut(true);

    logout().then(() => {
      setAccessToken('');
      setUser({
        email: '',
        profile: {
          firstName: '',
          lastName: '',
        },
      });
    });
  };

  const onLoginClick = (): void => history.push('/login');

  const onRegisterClick = (): void => history.push('/register');

  return (
    <div className={classes.root}>
      <TopMenu
        title={process.env.APP_NAME}
        hideIcon={props.hideSidebar}
        sidebarWidth={sidebarWidth}
        openSidebar={!props.hideSidebar && open}
        loggingOut={loggingOut}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        onSidebarOpen={onSidebarOpen}
      />

      {!props.hideSidebar && (
        <Sidebar open={open} onClose={handleDrawerClose} width={sidebarWidth} />
      )}

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Container maxWidth='lg'>{props.children}</Container>
      </main>
    </div>
  );
};

export default Page;
