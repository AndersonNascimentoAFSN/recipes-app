import React from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function DoneRecipeCardDrink(
  { recipeImg, doneDate, recipeName, index, alcoholicOrNot },
) {
  return (
    <div className="doneRecipesCard__container">
      <img
        src={ recipeImg }
        alt="recipe"
        className="doneRecipesCard__img"
        data-testid={ `${index}-horizontal-image` }
      />
      <div>
        <div>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </span>
          <ShareButton index={ index } />
        </div>
        <h2
          data-testid={ `${index}-horizontal-name` }
        >
          {recipeName}
        </h2>
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
};
