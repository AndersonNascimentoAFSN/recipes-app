import React from 'react';

function SearchBar() {
  return (
    <section className="search-bar">
      <input
        type="text"
        data-testid="search-input"
      />
      <input
        type="radio"
        radioGroup="search-radio"
        data-testid="ingredient-search-radio"
      />
      <input
        type="radio"
        radioGroup="search-radio"
        data-testid="name-search-radio"
      />
      <input
        type="radio"
        radioGroup="search-radio"
        data-testid="first-letter-search-radio"
      />
      <button data-testid="exec-search-btn">
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;