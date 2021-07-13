export default function verifyIngredientsInLocalStorage(type, recipe, ingredient, index) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) return;
  const recipeKey = (type === 'meal')
    ? inProgressRecipes.meals[recipe.idMeal]
    : inProgressRecipes.cocktails[recipe.idDrink];
  if (recipeKey && recipeKey.includes(ingredient)) {
    const oneSecondInMs = 1000;
    setTimeout(() => {
      const ingredientItem = document.getElementById(`${index}-ingredient-step`);
      ingredientItem.style.textDecoration = 'line-through';
    }, oneSecondInMs);
    return true;
  }
}
