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

  const [loadingMeals, setLoadingMeals] = useState(false);
  const [loadingDrinks, setLoadingDrinks] = useState(false);

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
    setLoadingMeals(true);
    const { parameter, search } = filters;
    const { meals } = await getMeals(parameter, search);
    if (meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setFoodData([]);
      setLoadingMeals(false);
      return;
    }
    if (meals.length > maxObjRetrieve) {
      setFoodData(meals.slice(0, maxObjRetrieve));
      setLoadingMeals(false);
      return;
    }
    setFoodData(meals);
    setLoadingMeals(false);
  }

  async function fetchCocktails() {
    setLoadingDrinks(true);
    const { parameter, search } = filters;
    const { drinks } = await getCocktails(parameter, search);
    if (drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setDrinkData([]);
      setLoadingDrinks(false);
      return;
    }
    if (drinks.length > maxObjRetrieve) {
      setDrinkData(drinks.slice(0, maxObjRetrieve));
      setLoadingDrinks(false);
      return;
    }
    setDrinkData(drinks);
    setLoadingDrinks(false);
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
    loadingMeals,
    loadingDrinks,
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
