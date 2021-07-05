import React from 'react';
import { string, number } from 'prop-types';

function RecipeCard({ index, thumbnail, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ thumbnail }
        alt={ `${name} recipe` }
      />
      <h2
        data-testid={ `${index}-card-name` }
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
