import React, { useContext, useState } from 'react';
import RecipeContext from '../context/RecipesContext';
import inputsContent from '../utils/searchBarInputsContent';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [searchParameter, setSearchParameter] = useState('');

  const { setFilters } = useContext(RecipeContext);

  function handleSearch() {
    if (searchParameter === 'first-letter' && searchText.length > 1) {
      alert('Pesquisa inválida, digite apenas uma letra');
      return;
    }

    setFilters({
      search: searchText,
      parameter: searchParameter,
    });
  }

  return (
    <section className="search-bar">
      <input
        type="text"
        data-testid="search-input"
        value={ searchText }
        onChange={ ({ target }) => setSearchText(target.value) }
      />
      { inputsContent.map((input) => (
        <label htmlFor={ input.testid }>
          { input.label }
          <input
            type="radio"
            id={ input.testid }
            name="search-radio"
            data-testid={ input.testid }
            value={ input.value }
            onChange={ ({ target }) => setSearchParameter(target.value) }
          />
        </label>
      )) }
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch() }
      >
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;
