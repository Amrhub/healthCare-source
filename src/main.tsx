import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScopedCssBaseline>
        <App />
      </ScopedCssBaseline>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
