import React, { useContext } from 'react';
import searchIcon from '../images/searchIcon.svg';
import SearchBarContext from '../utils/context/SearchBarContext';

export default function ButtonSearch() {
  const { setSearchBarShowHiden } = useContext(SearchBarContext);

  function handleHideShowSearchBar() {
    setSearchBarShowHiden((o) => !o);
  }

  return (
    <button
      type="button"
      className="header__button"
      onClick={ handleHideShowSearchBar }
    >
      <img src={ searchIcon } alt="explore icon" data-testid="search-top-btn" />
    </button>
  );
}
