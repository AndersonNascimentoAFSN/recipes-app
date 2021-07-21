import React from 'react';
import './ingredientCard.css';

function IngredientCard({ index, thumbnail, name, onClick }) {
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      className="ingredientCard__container"
      onClick={ onClick }
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

export default IngredientCard;