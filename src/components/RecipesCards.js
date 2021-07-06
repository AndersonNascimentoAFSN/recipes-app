import React from 'react';
import './mealsCards.css';
import useSearchRecipes from '../hooks/useSearchRecipes';

export default function MealsCard() {
  const {
    recipesSearch,
    recipesSearcBycategory,
    filterActiveButtons,
    /* filterActiveButton0,
    filterActiveButton1,
    filterActiveButton2,
    filterActiveButton3,
    filterActiveButton4 */ } = useSearchRecipes();
  /* const arrayButtonState = [
    filterActiveButton0,
    filterActiveButton1,
    filterActiveButton2,
    filterActiveButton3,
    filterActiveButton4]; */
  const arrayButtonState = Object.values(filterActiveButtons);
  const filterActive = arrayButtonState.some((button) => button === true);
  let arrayRender = [];
  if (filterActive) {
    arrayRender = recipesSearcBycategory;
  } else {
    arrayRender = recipesSearch;
  }
  console.log(arrayRender);
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
