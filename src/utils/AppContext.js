import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Context
export const AppContext = createContext({});

// Actions
const SEARCH_BAR_SHOW_HIDE = 'SEARCH_BAR_SHOW_HIDE';
export const searchBarShowHide = () => (
  { type: SEARCH_BAR_SHOW_HIDE }
);

// Provider
export const AppProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
    case SEARCH_BAR_SHOW_HIDE:
      return { ...state, showHide: !state.showHide };
    default:
      return state;
    }
  };

  const [appData, appDispatch] = useReducer(reducer, {
    showHide: false,
  });

  return (
    <AppContext.Provider value={ { appData, appDispatch } }>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
