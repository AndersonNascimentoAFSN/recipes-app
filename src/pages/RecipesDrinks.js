import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';
import RecipeContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { getCocktails } from '../services/api';
import RecipesCards from '../components/RecipesCards';
import RecipesCategoryFilters from '../components/RecipesCategoryFilters';
import useSearchRecipes from '../hooks/useSearchRecipes';

export default function RecipesDrinks() {
  const { filters, fetchCocktails, drinkData } = useContext(RecipeContext);
  const { appData: { showHide } } = useSearchBarShowHide();
  const { setRecipesSearch } = useSearchRecipes();

  useEffect(() => {
    if (filters.parameter !== '') {
      fetchCocktails();
    }
  }, [filters]);

  useEffect(() => {
    getCocktails('name')
      .then((data) => {
        const quantityRecipes = 12;
        const arrayRecipes = data.drinks.map((drink) => ({
          idRecipes: drink.idDrink,
          strRecipes: drink.strDrink,
          strRecipesThumb: drink.strDrinkThumb,
        }));
        const recipes = arrayRecipes.filter((_, index) => index < quantityRecipes);
        setRecipesSearch(recipes);
      });
  }, []);

  if (drinkData && drinkData.length === 1) {
    return <Redirect to={ `/bebidas/${drinkData[0].idDrink}` } />;
  }

  return (
    <div>
      <Header title="Bebidas">
        <ButtonSearch />
        { showHide && <SearchBar /> }
      </Header>
      {drinkData && drinkData.map((drink, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          name={ drink.strDrink }
          thumbnail={ drink.strDrinkThumb }
        />
      ))}

      <RecipesCategoryFilters typeRecipes="drinks" />
      <RecipesCards />
      <Footer />
    </div>
  );
}
