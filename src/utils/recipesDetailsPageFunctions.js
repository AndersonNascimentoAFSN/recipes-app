export function isFavorite(favorites, id) {
  let favoriteFlag = false;
  favorites.forEach((recipe) => {
    if (recipe.id === id) favoriteFlag = true;
  });
  return favoriteFlag;
}

export function alreadyDone(doneRecipes, id) {
  let doneFlag = false;
  doneRecipes.forEach((recipe) => {
    if (recipe.id === id) doneFlag = true;
  });
  return doneFlag;
}

export function inProgress(id, recipeType) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipeType === 'food') {
    if (inProgressRecipes) return inProgressRecipes.meals[id] !== undefined;
    return false;
  }
  if (recipeType === 'drink') {
    if (inProgressRecipes) return inProgressRecipes.cocktails[id] !== undefined;
    return false;
  }
}

export function favoriteMeal(favorites, id, setFavorites, meal) {
  if (isFavorite(favorites, id)) {
    setFavorites(
      favorites.filter((fav) => fav.id !== meal.idMeal),
    );
    return;
  }
  const newFavorite = {
    id: meal.idMeal,
    type: 'comida',
    area: meal.strArea,
    category: meal.strCategory,
    alcoholicOrNot: '',
    name: meal.strMeal,
    image: meal.strMealThumb,
  };
  setFavorites([
    ...favorites,
    newFavorite,
  ]);
}

export function favoriteDrink(favorites, id, setFavorites, drink) {
  if (isFavorite(favorites, id)) {
    setFavorites(
      favorites.filter((fav) => fav.id !== drink.idDrink),
    );
    return;
  }
  const newFavorite = {
    id: drink.idDrink,
    type: 'bebida',
    area: '',
    category: drink.strCategory,
    alcoholicOrNot: drink.strAlcoholic,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
  };
  setFavorites([
    ...favorites,
    newFavorite,
  ]);
}
