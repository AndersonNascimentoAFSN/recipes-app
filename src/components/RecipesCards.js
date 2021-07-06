import React from 'react';
import './mealsCards.css';
import useSearchRecipes from '../hooks/useSearchRecipes';

export default function MealsCard() {
  const {
    recipesSearch,
    recipesSearcBycategory,
    filterActiveButtons } = useSearchRecipes();
  const arrayButtonState = Object.values(filterActiveButtons);
  const filterActive = arrayButtonState.some((button) => button === true);
  let arrayRender = [];
  if (filterActive) {
    arrayRender = recipesSearcBycategory;
  } else {
    arrayRender = recipesSearch;
  }
  return (
    <div className="mealsCards__container">
      {arrayRender.map(({ idRecipes, strRecipes, strRecipesThumb }, index) => (
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
