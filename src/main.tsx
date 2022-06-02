import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import { store } from './redux/configureStore';

ReactDOM.render(
  <React.Fragment>
    <Router>
      <ScopedCssBaseline>
        <Provider store={store}>
          <App />
        </Provider>
      </ScopedCssBaseline>
    </Router>
  </React.Fragment>,
  document.getElementById('root'),
);
