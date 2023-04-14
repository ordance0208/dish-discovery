import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ThemeColorProvider, { theme } from './theme';
import './App.css';
// import ThemeColorProvider from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      {/* <ThemeProvider theme={theme}>
      </ThemeProvider> */}
      <ThemeColorProvider>
        <App />
      </ThemeColorProvider>
    </Router>
  </React.StrictMode>
);
