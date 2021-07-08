import React from 'react';
import PropTypes from 'prop-types';

export default function DoneRecipeCardDrink(
  { recipeImg, shareIcon, doneDate, recipeName, index, alcoholicOrNot },
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
          <button
            type="button"
          >
            <img
              src={ shareIcon }
              alt="share recipes"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
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
  shareIcon: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
