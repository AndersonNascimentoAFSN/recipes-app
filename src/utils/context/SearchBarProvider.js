import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBarContext from './SearchBarContext';

function SearchBarProvider({ children }) {
  const [searchBarShowHiden, setSearchBarShowHiden] = useState(false);
  const showHiden = {
    searchBarShowHiden,
    setSearchBarShowHiden,
  };

  return (
    <SearchBarContext.Provider value={ showHiden }>
      { children }
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
