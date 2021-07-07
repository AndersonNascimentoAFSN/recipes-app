import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategories, getCocktails, getMeals } from '../services/api';
import useRecipesContext from '../hooks/useRecipesContext';
import './recipesCategoryFilters.css';

export default function RecipesCategoryFilters({ typeRecipes }) {
  const [recipesCategories, setRecipesCategories] = useState([]);
  const { setFilters } = useRecipesContext();

  useEffect(() => {
    getCategories(typeRecipes).then((data) => {
      const quantityCategories = 5;
      const categoriesList = data[typeRecipes]
        .filter((_, index) => index < quantityCategories);
      setRecipesCategories(categoriesList);
    });
  }, [typeRecipes]);

  // function arrayRecipesAllCategories(ApiResponseAllCategories) {
  //   if (typeRecipes === 'meals') {
  //     return ApiResponseAllCategories[typeRecipes].map((recipe) => ({
  //       idRecipes: recipe.idMeal,
  //       strRecipes: recipe.strMeal,
  //       strRecipesThumb: recipe.strMealThumb,
  //     }));
  //   }
  //   if (typeRecipes === 'drinks') {
  //     return ApiResponseAllCategories[typeRecipes].map((recipe) => ({
  //       idRecipes: recipe.idDrink,
  //       strRecipes: recipe.strDrink,
  //       strRecipesThumb: recipe.strDrinkThumb,
  //     }));
  //   }
  // }

  function handleClickButtonAll() {
    if (typeRecipes === 'meals') {
      // getMeals('name').then((data) => {
      //   const arrayRecipes = arrayRecipesAllCategories(data);
      //   setRecipesSearcBycategory(arrayRecipes);
      // });
    }
    if (typeRecipes === 'drinks') {
      // getCocktails('name').then((data) => {
      //   const arrayRecipes = arrayRecipesAllCategories(data);
      //   setRecipesSearcBycategory(arrayRecipes);
      // });
    }
  }

  function handleClick({ target }) {
    const { textContent } = target;
    const filter = {
      search: textContent,
      parameter: 'category',
    };
    console.log(filter);
    switch (typeRecipes) {
    case 'meals':
      setFilters(filter);
      break;
    case 'drinks':
      setFilters(filter);
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
      >
        All
      </button>
    </div>
  );
}

RecipesCategoryFilters.propTypes = {
  typeRecipes: PropTypes.string.isRequired,
};
