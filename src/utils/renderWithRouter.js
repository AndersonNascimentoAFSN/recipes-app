import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = ({ children }) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{children}</Router>), history,
  });
};

export default renderWithRouter;
