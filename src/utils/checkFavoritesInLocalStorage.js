function checkFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites !== null) return favorites;
  return [];
}

export default checkFavorites;