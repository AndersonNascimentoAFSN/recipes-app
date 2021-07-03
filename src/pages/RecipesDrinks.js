import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipesContext';
import { Redirect } from 'react-router-dom';

export default function RecipesDrinks() {
  const { filters, fetchCocktails, drinkData } = useContext(RecipeContext);

  useEffect(() => {
    if (filters.parameter !== '') {
      fetchCocktails();
    }
  }, [filters]);

  if (drinkData && drinkData.length === 1) return <Redirect to={`/bebidas/${drinkData[0].idDrink}`}/>

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
