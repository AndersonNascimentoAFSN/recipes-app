import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function RecipesDoneFilters() {
  const { setDoneRecipes, doneRecipes } = useContext(RecipesContext);

  function handleClickAll() {
    const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesArray);
  }
  function handleClickFilterbyRecipeType({ target }) {
    handleClickAll();
    const nameButton = target.textContent;
    if (nameButton === 'Food') {
      const filterFood = doneRecipes.filter((doneRecipe) => doneRecipe.type === 'comida');
      setDoneRecipes(filterFood);
    } else {
      const filterDrinks = doneRecipes.filter(
        (doneRecipe) => doneRecipe.type === 'bebida',
      );
      setDoneRecipes(filterDrinks);
    }
  }

  return (
    <div className="doneRecipes__filters">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleClickAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ handleClickFilterbyRecipeType }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleClickFilterbyRecipeType }
      >
        Drinks
      </button>
    </div>
  );
}
