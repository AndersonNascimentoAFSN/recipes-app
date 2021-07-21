import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getIngredients } from '../services/api';
import RecipeContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreIngredientsDrinks() {
  const maxObjRetrieve = 12;
  const { setFilters } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState();
  const [shouldRedirect, setRedirect] = useState(false);

  useEffect(() => {
    async function fetchIngredients() {
      const { drinks } = await getIngredients('drinks');
      setIngredients(drinks.slice(0, maxObjRetrieve));
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
    return <Redirect to="/bebidas"/>;
  }
  
  return (
    <div>
      <Header title="Explorar Ingredientes">
        <div />
      </Header>
      { ingredients && ingredients.map(({strIngredient1}, index) => (
        <IngredientCard
          key={ index }  
          index={ index }
          name={ strIngredient1 }
          thumbnail={
            `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`
          }
          onClick={ () => handleNavigateToRecipesPage(strIngredient1) }
        />
      )) }
      <Footer />
    </div>
  );
}
