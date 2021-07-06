import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategories, getSearchByCategory } from '../services/api';
import useSearchRecipes from '../hooks/useSearchRecipes';
import './recipesCategoryFilters.css';

export default function RecipesCategoryFilters({ typeRecipes }) {
  const [recipesCategories, setRecipesCategories] = useState([]);
  const { setRecipesSearch } = useSearchRecipes();

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
    getSearchByCategory(typeRecipes, textContent)
      .then((data) => {
        if (typeRecipes === 'meals') {
          const arrayRecipes = data[typeRecipes].map((recipe) => ({
            idRecipes: recipe.IdMeal,
            strRecipes: recipe.strMeal,
            strRecipesThumb: recipe.strMealThumb,
          }));
          const quantityCategories = 12;
          const categorySearch = arrayRecipes
            .filter((_, index) => index < quantityCategories);
          setRecipesSearch(categorySearch);
        } else {
          const arrayRecipes = data[typeRecipes].map((recipe) => ({
            idRecipes: recipe.IdDrink,
            strRecipes: recipe.strDrink,
            strRecipesThumb: recipe.strDrinkThumb,
          }));
          const quantityCategories = 12;
          const categorySearch = arrayRecipes
            .filter((_, index) => index < quantityCategories);
          setRecipesSearch(categorySearch);
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
