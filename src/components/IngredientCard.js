import React from 'react';
import { string, number } from 'prop-types';
import './ingredientCard.css';

function IngredientCard({ index, thumbnail, name }) {
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      className="ingredientCard__container"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumbnail }
        alt={ `${name} recipe` }
        className="ingredientCard__img"
      />
      <div className="ingredientCard__title__container">
        <h2
          data-testid={ `${index}-card-name` }
          className="ingredientCard__title"
        >
          {name}
        </h2>
      </div>
    </div>
  );
}

IngredientCard.propTypes = {
  index: number.isRequired,
  thumbnail: string.isRequired,
  name: string.isRequired,
};

export default IngredientCard;
