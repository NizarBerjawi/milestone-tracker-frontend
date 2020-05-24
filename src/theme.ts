import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    // primary: blue
  },
  typography: {
    h1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: '4rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
  },
});

export default theme;
