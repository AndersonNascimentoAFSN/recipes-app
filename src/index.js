import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import SearchBarProvider from './utils/context/SearchBarProvider';
import App from './App';

ReactDOM.render(
  <SearchBarProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SearchBarProvider>,
  document.getElementById('root'),
);
