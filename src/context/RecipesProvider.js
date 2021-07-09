import React, { useState } from 'react';
import { element } from 'prop-types';
import RecipeContext from './RecipesContext';
import { getMeals, getCocktails } from '../services/api';

function RecipeProvider({ children }) {
  const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
  const filtersInitialState = {
    parameter: 'name',
    search: '',
  };
  const [filters, setFilters] = useState(filtersInitialState);
  const [drinkData, setDrinkData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState(doneRecipesArray);

  const buttonsInitialState = {
    buttonFilter0: false,
    buttonFilter1: false,
    buttonFilter2: false,
    buttonFilter3: false,
    buttonFilter4: false,
  };

  const [stateButtonsFilter, setStateButtonsFilter] = useState(buttonsInitialState);

  const maxObjRetrieve = 12;

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
    setFilters,
    drinkData,
    foodData,
    setFoodData,
    setDrinkData,
    stateButtonsFilter,
    setStateButtonsFilter,
    doneRecipes,
    setDoneRecipes,
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
