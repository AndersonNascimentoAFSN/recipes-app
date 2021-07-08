import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getMealByID } from '../services/api';
import ingredientsMesure from '../utils/ingredientsMesure';

export default function RecipesFoodsDetails(props) {
  const { match: { params: { id } } } = props;
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    const getMeal = async () => {
      const results = await getMealByID(id);
      console.log(results);
      setMeal(results);
    };

    getMeal();
  }, [id, setMeal]);

  const NUMBER_OF_INGREDIENTS = 15;
  const ingredients = ingredientsMesure(meal, NUMBER_OF_INGREDIENTS);

  return (
    <div>
      <h1>Detalhes das receitas de comida</h1>
      <img
        src={ meal.strMealThumb }
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
      <div data-testid="0-recomendation-card">Recomendação</div>
      <div data-testid="start-recipe-btn">Botão de iniciar receita</div>
    </div>
  );
}

RecipesFoodsDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};
