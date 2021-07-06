import React, { useState } from 'react';
import { element } from 'prop-types';
import RecipeContext from './RecipesContext';
import { getMeals, getCocktails } from '../services/api';

function RecipeProvider({ children }) {
  const filtersInitialState = {
    parameter: '',
    search: '',
  };
  const [filters, setFilters] = useState(filtersInitialState);
  const [drinkData, setDrinkData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [recipesSearch, setRecipesSearch] = useState([]);
  const maxObjRetrieve = 12;

  async function fetchMeals() {
    const { parameter, search } = filters;
    const { meals } = await getMeals(parameter, search);
    if (meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
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
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
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
    recipesSearch,
    setRecipesSearch,
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
