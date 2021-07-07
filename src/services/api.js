export async function getMeals(param, search) {
  switch (param) {
  case 'name':
    return (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)).json();
  case 'first-letter':
    return (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)).json();
  case 'ingredient':
    return (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`)).json();
  default:
    return [];
  }
}

export async function getCocktails(param, search) {
  switch (param) {
  case 'name':
    return (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)).json();
  case 'first-letter':
    return (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`)).json();
  case 'ingredient':
    return (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`)).json();
  default:
    return [];
  }
}

export async function getMealByID(id) {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const results = await fetch(`${endpoint}${id}`).then((response) => response.json());
  return results.meals[0];
}
