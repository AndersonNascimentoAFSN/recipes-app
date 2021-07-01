import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
// import SearchBarProvider from './utils/context/SearchBarProvider';
import { AppProvider } from './utils/AppContext';
import App from './App';

ReactDOM.render(
  // <SearchBarProvider>
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>,
  // </SearchBarProvider>,
  document.getElementById('root'),
);
