import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategories, getSearchByCategory } from '../services/api';
import useSearchRecipes from '../hooks/useSearchRecipes';
import './recipesCategoryFilters.css';

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

  function changeButtonState(buttonState) {
    const buttonsState = { button0: false,
      button1: false,
      button2: false,
      button3: false,
      button4: false,
    };
    delete buttonsState[buttonState];
    setFilterActiveButtons(buttonsState);
  }

  function handleClick({ target }) {
    switch (target.textContent) {
    case 'Beef':
      changeButtonState('button0');
      setFilterActiveButtons((prevState) => (
        { ...prevState, button0: !prevState.button0,
        }));
      break;
    case 'Breakfast':
      changeButtonState('button1');
      setFilterActiveButtons((prevState) => (
        { ...prevState, button1: !prevState.button1 }));
      break;
    case 'Chicken':
      changeButtonState('button2');
      setFilterActiveButtons((prevState) => (
        { ...prevState, button2: !prevState.button2 }));
      break;
    case 'Dessert':
      changeButtonState('button3');
      setFilterActiveButtons((prevState) => (
        { ...prevState, button3: !prevState.button3 }));
      break;
    case 'Goat':
      changeButtonState('button4');
      setFilterActiveButtons((prevState) => (
        { ...prevState, button4: !prevState.button4 }));
      break;
    default:
      return '';
    }
    const { textContent } = target;
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
