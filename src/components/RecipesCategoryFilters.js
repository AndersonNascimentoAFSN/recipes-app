import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategories, getSearchByCategory } from '../services/api';
import useSearchRecipes from '../hooks/useSearchRecipes';
import './recipesCategoryFilters.css';
import switchChangeStateButton from '../utils/switchChangeStateButton';

export default function RecipesCategoryFilters({ typeRecipes }) {
  const [recipesCategories, setRecipesCategories] = useState([]);
  const {
    setRecipesSearcBycategory,
    setFilterActiveButtons,
  } = useSearchRecipes();

  useEffect(() => {
    getCategories(typeRecipes).then((data) => {
      const quantityCategories = 5;
      const categoriesList = data[typeRecipes]
        .filter((_, index) => index < quantityCategories);
      setRecipesCategories(categoriesList);
    });
  }, [typeRecipes]);

  function handleClick({ target }) {
    const { textContent } = target;
    switchChangeStateButton(textContent, setFilterActiveButtons, recipesCategories);
    getSearchByCategory(typeRecipes, textContent)
      .then((data) => {
        if (typeRecipes === 'meals') {
          const arrayRecipes = data[typeRecipes].map((recipe) => ({
            idRecipes: recipe.idMeal,
            strRecipes: recipe.strMeal,
            strRecipesThumb: recipe.strMealThumb,
          }));
          const quantityCategories = 12;
          const categorySearch = arrayRecipes
            .filter((_, index) => index < quantityCategories);
          setRecipesSearcBycategory(categorySearch);
        } else {
          const arrayRecipes = data[typeRecipes].map((recipe) => ({
            idRecipes: recipe.idDrink,
            strRecipes: recipe.strDrink,
            strRecipesThumb: recipe.strDrinkThumb,
          }));
          const quantityCategories = 12;
          const categorySearch = arrayRecipes
            .filter((_, index) => index < quantityCategories);
          setRecipesSearcBycategory(categorySearch);
        }
      });
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
    </div>
  );
}

RecipesCategoryFilters.propTypes = {
  typeRecipes: PropTypes.string.isRequired,
};
