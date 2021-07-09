import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinkByID, getMeals } from '../services/api';
import ingredientsMesure from '../utils/ingredientsMesure';
import './recipesPageContainer.css';

const drinkPhoto = {
  maxWidth: '150px',
  maxHeight: '150px',
  margin: 'auto',
};

export default function RecipesDrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const [drink, setDrink] = useState([]);
  const [mealAlternate, setMealAlternate] = useState([]);

  useEffect(() => {
    const getDrink = async () => {
      const results = await getDrinkByID(id);
      console.log(results);
      const mealResults = await getMeals('name', '');
      setDrink(results);
      const RECOMMENDED_MEALS = 6;
      setMealAlternate(mealResults.meals.slice(0, RECOMMENDED_MEALS));
    };

    getDrink();
  }, [id, setDrink]);

  const NUMBER_OF_INGREDIENTS = 15;
  const ingredients = ingredientsMesure(drink, NUMBER_OF_INGREDIENTS);

  return (
    <div className="recipesPage__Container">
      <h1>Detalhes das receitas de bebida</h1>
      <img
        src={ drink.strDrinkThumb }
        style={ drinkPhoto }
        alt=""
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ drink.strDrink }</p>
      <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
      <p>{ drink.strCategory }</p>
      {ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </li>
      ))}
      <p data-testid="instructions">{ drink.strInstructions}</p>
      <iframe
        title="Youtube video"
        width="200"
        height="150"
        src={ drink.strYoutube }
        data-testid="video"
      />
      <div data-testid="share-btn">Botão de compartilhar</div>
      <div data-testid="favorite-btn">Botão de favoritar</div>
      <div>
        {mealAlternate.map((meal, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <li
              key={ index }
              data-testid={ `${index}-recomendation-title` }
            >
              {meal.strMeal}
            </li>
          </div>
        ))}
      </div>
      <div data-testid="start-recipe-btn">Botão de iniciar receita</div>
    </div>
  );
}

RecipesDrinksDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};
