import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';
import RecipeContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import RecipesCategoryFilters from '../components/RecipesCategoryFilters';
import './recipesPageContainer.css';

export default function RecipesDrinks() {
  const { filters, fetchCocktails, drinkData } = useContext(RecipeContext);
  const { appData: { showHide } } = useSearchBarShowHide();

  useEffect(() => {
    fetchCocktails();
  }, [filters]);

  const { parameter, search } = filters;
  if (drinkData && drinkData.length === 1
    && (parameter !== 'category' && search !== '')) {
    return <Redirect to={ `/bebidas/${drinkData[0].idDrink}` } />;
  }

  return (
    <div className="recipesPage__Container">
      <Header title="Bebidas">
        <ButtonSearch />
      </Header>

      { showHide && <SearchBar /> }

      <RecipesCategoryFilters typeRecipes="drinks" />

      <div className="recipeCards__container">
        {drinkData && drinkData.map((drink, index) => (
          <Link
            to={ `/bebidas/${drink.idDrink}` }
            key={ index }
          >
            <RecipeCard
              index={ index }
              name={ drink.strDrink }
              thumbnail={ drink.strDrinkThumb }
            />
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}
