import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function DoneRecipeCardDrink(
  { recipeImg, doneDate, recipeName, index, alcoholicOrNot, id, type },
) {
  return (
    <div className="doneRecipesCard__container">
      <Link to={ `/bebidas/${id}` }>
        <img
          src={ recipeImg }
          alt="recipe"
          className="doneRecipesCard__img"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div>
        <div>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </span>
          <ShareButton index={ index } id={ id } type={ type } />
        </div>
        <Link to={ `/bebidas/${id}` }>
          <h2
            data-testid={ `${index}-horizontal-name` }
          >
            {recipeName}
          </h2>
        </Link>
        <span
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Feita em: ${doneDate}`}
        </span>
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
