import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import DisfavorButton from './DisfavorButton';

export default function FavoriteRecipeCardDrink(
  { favoriteImg, favoriteName, index, alcoholicOrNot, id, type },
) {
  return (
    <div className="favoriteRecipesCard__container">
      <Link to={ `/bebidas/${id}` }>
        <img
          src={ favoriteImg }
          alt="recipe"
          className="favoriteRecipesCard__img"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div>
        <div>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </span>
        </div>
        <div>
          <ShareButton index={ index } id={ id } type={ type } />
          <DisfavorButton index={ index } />
        </div>
        <Link to={ `/bebidas/${id}` }>
          <h2
            data-testid={ `${index}-horizontal-name` }
          >
            {favoriteName}
          </h2>
        </Link>
      </div>
    </div>
  );
}

FavoriteRecipeCardDrink.propTypes = {
  favoriteImg: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  favoriteName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
