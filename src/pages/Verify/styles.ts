import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.grey[400],
      backgroundColor: theme.palette.common.white,
    },
    icon: {
      margin: theme.spacing(2),
      fontSize: 86,
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
  })
);
