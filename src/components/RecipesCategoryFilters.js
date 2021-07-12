import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import useRecipesContext from '../hooks/useRecipesContext';
import './recipesCategoryFilters.css';
import setStateButtonsFilters from '../utils/toggleButtonsFilters';

export default function RecipesCategoryFilters({ typeRecipes }) {
  const [recipesCategories, setRecipesCategories] = useState([]);
  const {
    setFilters, stateButtonsFilter,
    setStateButtonsFilter,
  } = useRecipesContext();

  useEffect(() => {
    getCategories(typeRecipes).then((data) => {
      const quantityCategories = 5;
      const categoriesList = data[typeRecipes]
        .filter((_, index) => index < quantityCategories);
      setRecipesCategories(categoriesList);
    });
  }, [typeRecipes]);

  useEffect(() => {
    const buttonsState = Object.values(stateButtonsFilter)
      .every((buttonState) => buttonState === false);
    if (buttonsState) {
      setFilters({ search: '', parameter: 'name' });
    }
  }, [stateButtonsFilter, setFilters]);

  function handleClickButtonAll() {
    setFilters({ search: '', parameter: 'name' });
  }

  function setFiltersStates(target, filter) {
    setFilters(filter);
    setStateButtonsFilters(target, setStateButtonsFilter, recipesCategories);
  }

  function handleClick({ target }) {
    const { textContent } = target;
    const filter = {
      search: textContent,
      parameter: 'category',
    };
    switch (typeRecipes) {
    case 'meals':
      setFiltersStates(target, filter);
      break;
    case 'drinks':
      setFiltersStates(target, filter);
      break;
    default:
      return '';
    }
  }
  return (
    <div className="recipesCategoryFilters__containers">
      {recipesCategories.map(({ strCategory }, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleClick }
          className="recipesCategoryFilters__button"
        >
          {strCategory}
        </button>
      ))}
      <button
        type="button"
        onClick={ handleClickButtonAll }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

RecipesCategoryFilters.propTypes = {
  typeRecipes: PropTypes.string.isRequired,
};
