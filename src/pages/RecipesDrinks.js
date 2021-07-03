import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipesContext';

export default function RecipesDrinks() {
  const { filters, fetchCocktails, drinkData } = useContext(RecipeContext);

  useEffect(() => {
    if (filters.parameter !== '') {
      fetchCocktails();
    }
  }, [filters]);
  
  return (
    <div>
      <Header title="Bebidas">
        <ButtonSearch />
        <SearchBar />
      </Header>
      {drinkData && drinkData.map((drink) => (
        <h3>{ drink.strDrink }</h3>
      ))}

    </div>
  );
}
