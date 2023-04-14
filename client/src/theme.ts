import { createTheme } from '@mui/material/styles';

export const WHITE = '#FFFFFF';
export const MAIN = '#23CE6B';
export const TEXT_DARK = '#50514F'

const theme = createTheme({
  palette: {
    primary: {
      main: '#23CE6B',
      dark: '#1BAB58',
    },
  },
  breakpoints: {},
});

export default theme;
