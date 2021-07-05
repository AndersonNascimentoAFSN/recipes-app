import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

export default function RecipesFoods() {
  const { filters, fetchMeals, foodData } = useContext(RecipeContext);

  useEffect(() => {
    console.log('atualizou os filtros');
    if (filters.parameter !== '') {
      fetchMeals();
    }
  }, [filters]);

  if (foodData && foodData.length === 1) {
    return <Redirect to={ `/comidas/${foodData[0].idMeal}` } />;
  }

  return (
    <div>
      <Header title="Comidas">
        <ButtonSearch />
        <SearchBar />
      </Header>
      {foodData && foodData.map((food, index) => (
        <RecipeCard
          key={ index }
          index={ index }
          name={ food.strMeal }
          thumbnail={ food.strMealThumb }
        />
      ))}

      <Footer />
    </div>
  );
}
