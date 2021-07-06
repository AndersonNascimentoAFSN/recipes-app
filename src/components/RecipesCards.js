import React from 'react';
import './mealsCards.css';
import useSearchRecipes from '../hooks/useSearchRecipes';

export default function MealsCard() {
  const { recipesSearch } = useSearchRecipes();
  return (
    <div className="mealsCards__container">
      {recipesSearch.map(({ idRecipes, strRecipes, strRecipesThumb }, index) => (
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
