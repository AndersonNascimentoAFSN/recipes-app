import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import DisfavorButton from './DisfavorButton';
import './favoriteRecipeCard.css';

export default function FavoriteRecipeCardDrink(
  { favoriteImg, favoriteName, index, alcoholicOrNot, id, type },
) {
  return (
    <div className="favoriteRecipesCard">
      <Link
        to={ `/bebidas/${id}` }
        classname="favoriteRecipesCard__img__wrapper"
      >
        <img
          src={ favoriteImg }
          alt="recipe"
          className="favoriteRecipesCard__img"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>

      <div className="favoriteRecipesCard__info__wrapper">
        <div className="favoriteRecipesCard__info">
          <span
            data-testid={ `${index}-horizontal-top-text` }
            className="favoriteRecipesCard__info__subtitle"
          >
            {alcoholicOrNot}
          </span>
          <Link to={ `/bebidas/${id}` }>
            <h2
              data-testid={ `${index}-horizontal-name` }
              className="favoriteRecipesCard__info__title"
            >
              {favoriteName}
            </h2>
          </Link>
          <div className="favoriteRecipesCard__buttons">
            <ShareButton index={ index } id={ id } type={ type } />
            <DisfavorButton index={ index } id={ id } />
          </div>
        </div>
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
