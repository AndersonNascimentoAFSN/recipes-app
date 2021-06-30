import React from 'react';
import './searchBar.css';

function SearchBar() {
  return (
    <section className="search-bar" id="search-bar">
      <input
        type="text"
        data-testid="search-input"
        id="search-input"
        className="search__input"
      />
      <div className="searchBar__inputs">
        <label htmlFor="ingredient-search-radio">
          Ingrediente
          <input
            type="radio"
            radioGroup="search-radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            name="search-radio"
          />
        </label>

        <label htmlFor="name-search-radio">
          Nome
          <input
            type="radio"
            radioGroup="search-radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            name="search-radio"
          />
        </label>

        <label htmlFor="first-letter-search-radio">
          Primeira letra
          <input
            type="radio"
            radioGroup="search-radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="search-radio"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;
