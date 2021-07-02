// https://www.smashingmagazine.com/2020/07/react-apps-testing-library/

import React from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import history from './history';

import { AppProvider } from './AppContext';

const Wrapper = ({ children }) => (
  <AppProvider>
    <Router history={ history }>{children}</Router>
  </AppProvider>
);

const customRender = (ui, options) => ({
  ...render(ui, { wrapper: Wrapper, ...options }),
});

export * from '@testing-library/react';

export { customRender as render };

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
