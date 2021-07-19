import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';
import RecipeContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import RecipesCategoryFilters from '../components/RecipesCategoryFilters';
import Loading from '../components/Loading';
import './recipesPageContainer.css';

export default function RecipesFoods() {
  const { filters, fetchMeals, foodData, loadingMeals } = useContext(RecipeContext);
  const { appData: { showHide } } = useSearchBarShowHide();

  useEffect(() => {
    const recipesCardContainer = document.querySelector('.recipeCards__container');
    if (showHide && recipesCardContainer) {
      recipesCardContainer.classList.add('searchBarOpen');
    } else {
      recipesCardContainer.classList.remove('searchBarOpen');
    }
  }, [showHide]);

  useEffect(() => {
    fetchMeals();
  }, [filters]);

  console.log(loadingMeals);

  const { parameter, search } = filters;
  if (foodData && foodData.length === 1
    && (parameter !== 'category' && search !== '')) {
    return <Redirect to={ `/comidas/${foodData[0].idMeal}` } />;
  }

  return (
    <div className="recipesPage__Container">
      <Header title="Comidas">
        <ButtonSearch />
      </Header>

      { showHide && <SearchBar /> }

      <RecipesCategoryFilters typeRecipes="meals" />

      {
        loadingMeals ? <Loading /> : (
          <div className="recipeCards__container">
            {foodData && foodData.map((food, index) => (
              <Link
                to={ `/comidas/${food.idMeal}` }
                key={ index }
              >
                <RecipeCard
                  index={ index }
                  name={ food.strMeal }
                  thumbnail={ food.strMealThumb }
                />
              </Link>
            ))}
          </div>
        )
      }

      <Footer />
    </div>
  );
}
