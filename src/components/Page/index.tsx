import * as React from 'react';
import { useHistory } from 'react-router-dom';

import TopMenu from '../TopMenu';
import Sidebar from '../Sidebar';
import { useStyles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services';

interface PageProps {
  hideSidebar?: boolean;
  sidebarWidth?: number;
}

const Page: React.FC<PageProps> = (
  props: React.PropsWithChildren<PageProps>
) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [loggingOut, setloggingOut] = React.useState(false);
  const { setAccessToken } = useAuth();

  const onSidebarOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const onLogoutClick = (): void => {
    setloggingOut(true);

    authService.logout().then(() => {
      setAccessToken('');
      setloggingOut(false);
    });
  };

  const onLoginClick = (): void => history.push('/login');

  const onRegisterClick = (): void => history.push('/register');

  return (
    <div className={classes.root}>
      <TopMenu
        title={process.env.APP_NAME}
        hideIcon={props.hideSidebar}
        sidebarWidth={props.sidebarWidth}
        openSidebar={!props.hideSidebar && open}
        loggingOut={loggingOut}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        onSidebarOpen={onSidebarOpen}
      />

      {!props.hideSidebar && (
        <Sidebar
          open={open}
          onClose={handleDrawerClose}
          width={props.sidebarWidth}
        />
      )}

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

export default Page;
