import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TopMenuProps } from '../TopMenu';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: 'transparent',
    },
    appBarShift: ({ sidebarWidth }: TopMenuProps) => ({
      marginLeft: sidebarWidth,
      width: `calc(100% - ${sidebarWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    menuButton: {
      marginRight: theme.spacing(6),
    },
    hide: {
      display: 'none',
    },
    action: {
      fontWeight: theme.typography.fontWeightBold,
    },
    primary: {
      color: theme.palette.text.primary,
    },
    secondary: {
      color: theme.palette.text.secondary,
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: theme.palette.text.secondary,
      textDecoration: 'none',
    },
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);
