import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';

// import './styles/helpers.css';
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <LocaleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocaleProvider>
  </ThemeProvider>
);