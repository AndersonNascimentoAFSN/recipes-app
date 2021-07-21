import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getIngredients } from '../services/api';
import RecipeContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreIngredientsFood() {
  const maxObjRetrieve = 12;
  const { setFilters } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState();
  const [shouldRedirect, setRedirect] = useState(false);

  useEffect(() => {
    async function fetchIngredients() {
      const { meals } = await getIngredients('meals');
      setIngredients(meals.slice(0, maxObjRetrieve));
    }
    fetchIngredients();
  }, []);
  
  function handleNavigateToRecipesPage(ingredientName) {
    setFilters({
      parameter: 'ingredient',
      search: ingredientName,
    });
    setRedirect(true);
  }

  if (shouldRedirect) {
    return <Redirect to="/comidas"/>;
  }
  
  return (
    <div>
      <Header title="Explorar Ingredientes">
        <div />
      </Header>
      { ingredients && ingredients.map(({strIngredient}, index) => (
        <IngredientCard
          key={ index }  
          index={ index }
          name={ strIngredient }
          thumbnail={`https://www.themealdb.com/images/ingredients/${strIngredient}.png`}
          onClick={ () => handleNavigateToRecipesPage(strIngredient) }
        />
      )) }
      <Footer />
    </div>
  );
}
