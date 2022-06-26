import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

import './styles/css/helpers.css';
import './styles/css/style.css';

const root = createRoot(document.getElementById('root'));
root.render(<App/>);