import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';
import RecipeContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { getMeals } from '../services/api';
import RecipesCards from '../components/RecipesCards';
import RecipesCategoryFilters from '../components/RecipesCategoryFilters';
import './recipesFood.css';
import useSearchRecipes from '../hooks/useSearchRecipes';

export default function RecipesFoods() {
  const { filters, fetchMeals, foodData } = useContext(RecipeContext);
  const { appData: { showHide } } = useSearchBarShowHide();
  const { setRecipesSearch } = useSearchRecipes();

  useEffect(() => {
    getMeals('name')
      .then((data) => {
        const quantityRecipes = 12;
        const arrayRecipes = data.meals.map((meal) => ({
          idRecipes: meal.idMeal,
          strRecipes: meal.strMeal,
          strRecipesThumb: meal.strMealThumb,
        }));
        const recipes = arrayRecipes.filter((_, index) => index < quantityRecipes);
        setRecipesSearch(recipes);
      });
  }, [setRecipesSearch]);

  useEffect(() => {
    if (filters.parameter !== '') {
      fetchMeals();
    }
  }, [filters, fetchMeals]);

  if (foodData && foodData.length === 1) {
    return <Redirect to={ `/comidas/${foodData[0].idMeal}` } />;
  }

  return (
    <div className="recipesFood__Container">
      <Header title="Comidas">
        <ButtonSearch />
        { showHide && <SearchBar /> }
      </Header>
      {foodData && foodData.map((food, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          name={ food.strMeal }
          thumbnail={ food.strMealThumb }
        />
      ))}

      <RecipesCategoryFilters typeRecipes="meals" />
      <RecipesCards />
      <Footer />
    </div>
  );
}
