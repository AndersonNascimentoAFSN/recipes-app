import React, { useState, useEffect } from 'react';
import { element } from 'prop-types';
import RecipeContext from './RecipesContext';
import { getMeals, getCocktails } from '../services/api';
import checkFavorites from '../utils/checkFavoritesInLocalStorage';

function checkLocalStorage(doneOrFavoriteRecipes) {
  const recipesArray = JSON.parse(localStorage.getItem(doneOrFavoriteRecipes));
  if (recipesArray !== null) {
    return recipesArray;
  }
  return [];
}

function RecipeProvider({ children }) {
  const filtersInitialState = {
    parameter: 'name',
    search: '',
  };
  const [filters, setFilters] = useState(filtersInitialState);
  const [filtersDone, setFiltersDone] = useState({ type: 'all' });
  const [filtersFavorite, setFiltersFavorite] = useState({ type: 'all' });
  const [drinkData, setDrinkData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [favorites, setFavorites] = useState(checkFavorites());
  const [inProgressRecipes,
    setInProgressRecipes] = useState(checkLocalStorage('inProgressRecipes'));
  const [doneRecipes, setDoneRecipes] = useState(checkLocalStorage('doneRecipes'));

  const buttonsInitialState = {
    buttonFilter0: false,
    buttonFilter1: false,
    buttonFilter2: false,
    buttonFilter3: false,
    buttonFilter4: false,
  };

  const [stateButtonsFilter, setStateButtonsFilter] = useState(buttonsInitialState);

  const maxObjRetrieve = 12;

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, [doneRecipes]);

  async function fetchMeals() {
    const { parameter, search } = filters;
    const { meals } = await getMeals(parameter, search);
    if (meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setFoodData([]);
      return;
    }
    if (meals.length > maxObjRetrieve) {
      setFoodData(meals.slice(0, maxObjRetrieve));
      return;
    }
    setFoodData(meals);
  }

  async function fetchCocktails() {
    const { parameter, search } = filters;
    const { drinks } = await getCocktails(parameter, search);
    if (drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setDrinkData([]);
      return;
    }
    if (drinks.length > maxObjRetrieve) {
      setDrinkData(drinks.slice(0, maxObjRetrieve));
      return;
    }
    setDrinkData(drinks);
  }

  const consumer = {
    fetchMeals,
    fetchCocktails,
    filters,
    filtersDone,
    setFiltersDone,
    filtersFavorite,
    setFiltersFavorite,
    setFilters,
    drinkData,
    foodData,
    setFoodData,
    setDrinkData,
    stateButtonsFilter,
    setStateButtonsFilter,
    doneRecipes,
    setDoneRecipes,
    favorites,
    setFavorites,
    inProgressRecipes,
    setInProgressRecipes,
  };

  return (
    <RecipeContext.Provider value={ { ...consumer } }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: element.isRequired,
};

export default RecipeProvider;
