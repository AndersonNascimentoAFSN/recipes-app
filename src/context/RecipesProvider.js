import React, { useState } from 'react';
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

  async function fetchMeals() {
    const { parameter, search } = filters;
    const { meals } = await getMeals(parameter, search);
    if (meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setFoodData([]);
    }
    setFoodData(meals);
  }

  async function fetchCocktails() {
    const { parameter, search } = filters;
    const { drinks } = await getCocktails(parameter, search);
    if (drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setDrinkData([]);
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
  };

  return (
    <RecipeContext.Provider value={ { ...consumer } }>
      { children }
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
