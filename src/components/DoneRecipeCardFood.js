import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import './doneRecipeCard.css';

export default function DoneRecipeCardFood(
  { area, category, recipeImg,
    doneDate, recipeTags, recipeName, index, id, type },
) {
  return (
    <div className="doneRecipesCard">

      <Link
        to={ `/comidas/${id}` }
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
          {`${area} - ${category}`}
        </span>
        <Link to={ `/comidas/${id}` }>
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

        <div className="doneRecipe__tags">
          {recipeTags && recipeTags.map((tag, indexTags) => (
            <span
              key={ indexTags }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="doneRecipe__shareButton">
          <ShareButton index={ index } id={ id } type={ type } />
        </div>
      </div>

    </div>
  );
}

DoneRecipeCardFood.propTypes = {
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recipeImg: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  recipeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
