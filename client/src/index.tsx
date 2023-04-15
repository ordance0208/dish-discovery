import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import ThemeColorProvider, { theme } from './theme';
import './App.css';
// import ThemeColorProvider from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ThemeColorProvider>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </ThemeColorProvider>
    </Router>
  </React.StrictMode>
);
