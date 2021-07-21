import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getIngredients } from '../services/api';
import RecipeContext from '../context/RecipesContext';
import IngredientCard from '../components/IngredientCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './exploreIngredients.css';

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
    return <Redirect to="/comidas" />;
  }

  return (
    <div>
      <Header title="Explorar Ingredientes">
        <div />
      </Header>

      <div className="exploreIngredientsCard__wrapper">
        { ingredients && ingredients.map(({ strIngredient }, index) => (
          <button
            key={ index }
            onClick={ () => handleNavigateToRecipesPage(strIngredient) }
            type="button"
            className="exploreIngredientsCard__wrapper_button"
          >
            <IngredientCard
              index={ index }
              name={ strIngredient }
              thumbnail={
                `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`
              }
            />
          </button>
        )) }
      </div>
      <Footer />
    </div>
  );
}
