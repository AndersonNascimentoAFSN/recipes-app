export async function getMeals(param, search = '') {
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

export async function getCocktails(param, search = '') {
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

function getURLCategories(typeRecipes) {
  switch (typeRecipes) {
  case 'meals':
    return 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  case 'drinks':
    return 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  default:
    return '';
  }
}

export async function getCategories(typeRecipes) {
  const url = getURLCategories(typeRecipes);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
