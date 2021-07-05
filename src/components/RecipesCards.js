import React from 'react';
import PropTypes from 'prop-types';
import './mealsCards.css';

export default function MealsCard({ recipes }) {
  return (
    <div className="mealsCards__container">
      {recipes.map(({ idRecipes, strRecipes, strRecipesThumb }, index) => (
        <div
          key={ idRecipes }
          data-testid={ `${index}-recipe-card` }
          className="mealCard__container"
        >
          <img
            src={ strRecipesThumb }
            alt={ strRecipes }
            data-testid={ `${index}-card-img` }
            className="mealCard__img"
          />
          <p
            data-testid={ `${index}-card-name` }
            className="mealCard__title"
          >
            { strRecipes }
          </p>
        </div>
      ))}
    </div>
  );
}

MealsCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
