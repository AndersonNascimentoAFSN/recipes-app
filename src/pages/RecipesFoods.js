import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import RecipeContext from '../context/RecipesContext';

export default function RecipesFoods() {
  const { filters, fetchMeals, foodData } = useContext(RecipeContext);

  useEffect(() => {
    if (filters.parameter !== '') {
      fetchMeals();
    }
  }, [filters]);
  
  return (
    <div>
      <Header title="Comidas">
        <ButtonSearch />
        <SearchBar />
      </Header>
      {foodData && foodData.map((food) => (
        <h3>{ food.strMeal }</h3>
      ))}
      
    </div>
  );
}
