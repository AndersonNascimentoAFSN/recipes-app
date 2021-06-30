import React, { useCallback, useEffect, useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function ButtonSearch() {
  const [show, setShow] = useState(false);

  const showHidenSearchBar = useCallback(() => {
    const searchBar = document.getElementById('searchBar');
    if (show === true) {
      searchBar.classList.add('search__bar--show');
      searchBar.classList.remove('search__bar--hiden');
    } else {
      searchBar.classList.add('search__bar--hiden');
      searchBar.classList.remove('search__bar--show');
    }
  });

  useEffect(() => {
    showHidenSearchBar();
  }, [showHidenSearchBar]);

  function handleHideShowSearchBar() {
    setShow((o) => !o);
    showHidenSearchBar();
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
