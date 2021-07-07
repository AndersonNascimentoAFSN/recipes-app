import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';
import RecipeContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import RecipesCategoryFilters from '../components/RecipesCategoryFilters';
import './recipesFood.css';

export default function RecipesFoods() {
  const { setFilters, filters, fetchMeals, foodData } = useContext(RecipeContext);
  const { appData: { showHide } } = useSearchBarShowHide();

  useEffect(() => {
    setFilters(
      { parameter: 'name',
        search: '',
      },
    );
  }, [setFilters]);

  useEffect(() => {
    if (filters.parameter !== '') {
      fetchMeals();
    }
  }, [filters]);

  const { parameter } = filters;
  if (foodData && foodData.length === 1 && parameter !== 'category') {
    return <Redirect to={ `/comidas/${foodData[0].idMeal}` } />;
  }

  return (
    <div className="recipesFood__Container">
      <Header title="Comidas">
        <ButtonSearch />
        { showHide && <SearchBar /> }
      </Header>

      <RecipesCategoryFilters typeRecipes="meals" />

      <div className="recipeCards__container">
        {foodData && foodData.map((food, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            name={ food.strMeal }
            thumbnail={ food.strMealThumb }
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
