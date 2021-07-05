import React from 'react';
import searchIcon from '../images/searchIcon.svg';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';
import { searchBarShowHide } from '../utils/AppContext';

export default function ButtonSearch() {
  const { appDispatch } = useSearchBarShowHide();

  function handleHideShowSearchBar() {
    appDispatch(searchBarShowHide());
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
