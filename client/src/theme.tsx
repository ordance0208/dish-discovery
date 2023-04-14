import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { useState, createContext, useMemo } from 'react';

export const WHITE = '#FFFFFF';
export const MAIN = '#23CE6B';
export const TEXT_DARK = '#50514F';
export const BACKGROUND_LIGHT = '#FAFAFA';
export const BACKGROUND_DARK = '#444444';

type ThemeContextType = {
  colorMode: string
  toggleColorMode: () => void
}

export const ThemeColorContext = createContext<ThemeContextType>({ colorMode: 'light', toggleColorMode: () => {} });

const designTheme = (mode: string): ThemeOptions => ({
  palette: {
    primary: {
      main: '#23CE6B',
      dark: '#1BAB58',
    },
    ...(mode === 'light'
      ? {
          text: {
            primary: '#50514F',
          },
          background: {
            default: BACKGROUND_LIGHT,
          },
        }
      : {
          text: {
            primary: '#FAFAFA',
          },
          background: {
            default: BACKGROUND_DARK,
          },
        }),
  },
});

const ThemeColorProvider = ({ children }: any) => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme(designTheme(colorMode)), [colorMode]);

  return (
    <ThemeColorContext.Provider value={{colorMode, toggleColorMode}}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeColorContext.Provider>
  );
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#23CE6B',
      dark: '#1BAB58',
    },
    text: {
      primary: '#FAFAFA',
    },
  },
});

export default ThemeColorProvider;
