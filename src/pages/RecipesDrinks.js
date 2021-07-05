import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

export default function RecipesDrinks() {
  const { filters, fetchCocktails, drinkData } = useContext(RecipeContext);

  useEffect(() => {
    if (filters.parameter !== '') {
      fetchCocktails();
    }
  }, [filters]);

  if (drinkData && drinkData.length === 1) {
    return <Redirect to={ `/bebidas/${drinkData[0].idDrink}` } />;
  }

  return (
    <div>
      <Header title="Bebidas">
        <ButtonSearch />
        <SearchBar />
      </Header>
      {drinkData && drinkData.map((drink, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          name={ drink.strDrink }
          thumbnail={ drink.strDrinkThumb }
        />
      ))}
      <Footer />
    </div>
  );
}
