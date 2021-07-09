import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getMealByID, getCocktails } from '../services/api';
import ingredientsMesure from '../utils/ingredientsMesure';
import './recipesPageContainer.css';

const mealPhoto = {
  maxWidth: '150px',
  maxHeight: '150px',
  margin: 'auto',
};

const startRecipe = {
  position: 'fixed',
  bottom: '0px',
};

export default function RecipesFoodsDetails(props) {
  const { match: { params: { id } } } = props;
  const [meal, setMeal] = useState([]);
  const [drinkAlternate, setDrinkAlternate] = useState([]);

  useEffect(() => {
    const getMeal = async () => {
      const results = await getMealByID(id);
      console.log(results);
      const drinkResults = await getCocktails('name', '');
      setMeal(results);
      const RECOMMENDED_DRINKS = 6;
      console.log(drinkResults.drinks.slice(0, RECOMMENDED_DRINKS));
      setDrinkAlternate(drinkResults.drinks.slice(0, RECOMMENDED_DRINKS));
    };

    getMeal();
  }, [id, setMeal]);

  const NUMBER_OF_INGREDIENTS = 15;
  const ingredients = ingredientsMesure(meal, NUMBER_OF_INGREDIENTS);

  return (
    <div className="recipesPage__Container">
      <h1>Detalhes das receitas de comida</h1>
      <img
        src={ meal.strMealThumb }
        style={ mealPhoto }
        alt=""
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ meal.strMeal }</p>
      <p data-testid="recipe-category">{ meal.strCategory }</p>
      {ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </li>
      ))}
      <p data-testid="instructions">{ meal.strInstructions}</p>
      <iframe
        title="Youtube video"
        width="200"
        height="150"
        src={ meal.strYoutube }
        data-testid="video"
      />
      <div data-testid="share-btn">Botão de compartilhar</div>
      <div data-testid="favorite-btn">Botão de favoritar</div>
      <div>
        {drinkAlternate.map((drink, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <li
              key={ index }
              data-testid={ `${index}-recomendation-title` }
            >
              {drink.strDrink}
            </li>
          </div>
        ))}
      </div>
      <div
        data-testid="start-recipe-btn"
        style={ startRecipe }
      >
        Botão de iniciar receita
      </div>
    </div>
  );
}

RecipesFoodsDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};
