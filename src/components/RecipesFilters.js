import React from 'react';
import PropTypes from 'prop-types';

export default function RecipesFilters({ setFilters }) {
  function handleClickFilterByRecipeType({ target }) {
    const typeFilter = target.textContent;
    switch (typeFilter) {
    case 'Food':
      setFilters({ type: 'comida' });
      break;
    case 'Drinks':
      setFilters({ type: 'bebida' });
      break;
    default:
      setFilters({ type: 'all' });
    }
  }

  return (
    <div className="doneRecipes__filters">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClickFilterByRecipeType }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleClickFilterByRecipeType }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClickFilterByRecipeType }
      >
        Drinks
      </button>
    </div>
  );
}

RecipesFilters.propTypes = {
  setFilters: PropTypes.func.isRequired,
};
