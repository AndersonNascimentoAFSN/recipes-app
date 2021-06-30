import React from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function ButtonSearch() {
  return (
    <button type="button" className="header__button">
      <img src={ searchIcon } alt="explore icon" data-testid="search-top-btn" />
    </button>
  );
}
