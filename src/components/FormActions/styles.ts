import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      margin: theme.spacing(0.5),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);
