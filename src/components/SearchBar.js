import React, { useContext, useState } from 'react';
import RecipeContext from '../context/RecipesContext';
import inputsContent from '../utils/searchBarInputsContent';
import './searchBar.css';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [searchParameter, setSearchParameter] = useState('');

  const { setFilters } = useContext(RecipeContext);

  function handleSearch() {
    if (searchParameter === 'first-letter' && searchText.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    setFilters({
      search: searchText,
      parameter: searchParameter,
    });
  }

  return (
    <section className="searchBar">
      <input
        type="text"
        data-testid="search-input"
        value={ searchText }
        onChange={ ({ target }) => setSearchText(target.value) }
        className="searchBar__input"
      />

      <fieldset className="searchBar__radios">
        { inputsContent.map((input, index) => (
          <label key={ index } htmlFor={ input.testid }>
            <input
              type="radio"
              id={ input.testid }
              name="search-radio"
              data-testid={ input.testid }
              value={ input.value }
              onChange={ ({ target }) => setSearchParameter(target.value) }
            />
            { input.label }
          </label>
        )) }
      </fieldset>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch() }
        className="searchBar__button"
      >
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;
