import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import DropdownFilter from '../components/AreaDropdownFilter';
import { getMeals } from '../services/api';

export default function ExploreAreaFood() {
  const { appData: { showHide } } = useSearchBarShowHide();
  const maxObjRetrieve = 12;
  const [areaFilter, setArea] = useState('');
  const [foundRecipes, setMeals] = useState();

  useEffect(() => {
    async function fetchAllFood() {
      const { meals } = await getMeals('name');
      setMeals(meals.slice(0, maxObjRetrieve));
    }
    async function fetchMealByArea() {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaFilter}`;
      const { meals } = await ((await fetch(url)).json().then((data) => data));
      setMeals(meals.slice(0, maxObjRetrieve));
    }
    if (areaFilter === '') {
      fetchAllFood();
      return;
    }
    fetchMealByArea();
  }, [areaFilter]);

  return (
    <div>
      <Header title="Explorar Origem">
        <ButtonSearch />
      </Header>
      { showHide && <SearchBar /> }
      <DropdownFilter
        selectedArea={ areaFilter }
        areaSetter={ setArea }
      />
      <div className="recipeCards__container">
        {foundRecipes && foundRecipes.map((recipe, index) => (
          <Link
            to={ `/comidas/${recipe.idMeal}` }
            key={ index }
          >
            <RecipeCard
              index={ index }
              name={ recipe.strMeal }
              thumbnail={ recipe.strMealThumb }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
