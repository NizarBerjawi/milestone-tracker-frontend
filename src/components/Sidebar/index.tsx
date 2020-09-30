import * as React from 'react';
import classNames from 'classnames';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GroupIcon from '@material-ui/icons/Group';

import { useStyles } from './styles';

export interface SidebarProps {
  open: boolean;
  width: number;
  onClose?: () => void;
}

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

const ListItemLink = (props: ListItemLinkProps): React.ReactElement => {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <Drawer
      variant='permanent'
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        {props.open && (
          <IconButton onClick={props.onClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        )}
      </div>

      <Divider />

      <List>
        {['Projects', 'Team'].map((text, index) => (
          <ListItemLink
            key={index}
            to='/project/'
            primary='projects'
            icon={<AccountTreeIcon />}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
