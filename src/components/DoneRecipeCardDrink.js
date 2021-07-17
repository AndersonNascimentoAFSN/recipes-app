import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import './doneRecipeCard.css';

export default function DoneRecipeCardDrink(
  { recipeImg, doneDate, recipeName, index, alcoholicOrNot, id, type },
) {
  return (
    <div className="doneRecipesCard">

      <Link
        to={ `/bebidas/${id}` }
        className="doneRecipesCard__img__wrapper"
      >
        <img
          src={ recipeImg }
          alt="recipe"
          className="doneRecipesCard__img"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>

      <div className="doneRecipesCard__info">
        <span
          data-testid={ `${index}-horizontal-top-text` }
          className="doneRecipesCard__info__subtitle"
        >
          {alcoholicOrNot}
        </span>
        <Link to={ `/bebidas/${id}` }>
          <h2
            data-testid={ `${index}-horizontal-name` }
            className="doneRecipesCard__info__title"
          >
            {recipeName}
          </h2>
        </Link>
        <span
          data-testid={ `${index}-horizontal-done-date` }
          className="doneRecipesCard__info__dateDone"
        >
          {`Feita em: ${doneDate}`}
        </span>

        <div className="doneRecipe__shareButton">
          <ShareButton index={ index } id={ id } type={ type } />
        </div>
      </div>
    </div>
  );
}

DoneRecipeCardDrink.propTypes = {
  recipeImg: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
