import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinkByID } from '../services/api';
import ingredientsMesure from '../utils/ingredientsMesure';

export default function RecipesDrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    const getDrink = async () => {
      const results = await getDrinkByID(id);
      console.log(results);
      setDrink(results);
    };

    getDrink();
  }, [id, setDrink]);

  const NUMBER_OF_INGREDIENTS = 15;
  const ingredients = ingredientsMesure(drink, NUMBER_OF_INGREDIENTS);

  return (
    <div>
      <h1>Detalhes das receitas de bebida</h1>
      <img
        src={ drink.strDrinkThumb }
        alt=""
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ drink.strDrink }</p>
      <p data-testid="recipe-category">{ drink.strCategory }</p>
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
      <div data-testid="0-recomendation-card">Recomendação</div>
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
