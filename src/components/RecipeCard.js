import React from 'react';
import { string, number } from 'prop-types';
import './recipeCard.css';

function RecipeCard({ index, thumbnail, name }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      // className="recipeCard__container"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumbnail }
        alt={ `${name} recipe` }
        className="recipeCard__img"
      />
      <h2
        data-testid={ `${index}-card-name` }
        className="recipeCard__title"
      >
        {name}
      </h2>
    </div>
  );
}

RecipeCard.propTypes = {
  index: number.isRequired,
  thumbnail: string.isRequired,
  name: string.isRequired,
};

export default RecipeCard;
