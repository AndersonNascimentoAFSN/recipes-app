export default function verifyIngredientsInLocalStorage(meal, ingredient, index) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgressRecipes) return;
  const mealKey = inProgressRecipes.meals[meal.idMeal];
  if (mealKey && mealKey.includes(ingredient)) {
    const oneSecondInMs = 1000;
    setTimeout(() => {
      const ingredientItem = document.getElementById(`${index}-ingredient-step`);
      ingredientItem.style.textDecoration = 'line-through';
    }, oneSecondInMs);
    return true;
  }
}
