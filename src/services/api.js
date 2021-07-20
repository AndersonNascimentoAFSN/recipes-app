export async function getMeals(param, search = '') {
  switch (param) {
  case 'name':
    return (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)).json();
  case 'first-letter':
    return (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)).json();
  case 'ingredient':
    return (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`)).json();
  case 'category':
    return (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`)).json();
  case 'surprise':
    return (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json();
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
  case 'category':
    return (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${search}`)).json();
  case 'surprise':
    return (await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')).json();
  default:
    return [];
  }
}

export async function getMealById(id) {
  const result = (await
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`))
    .json();
  return result;
}

export async function getDrinkById(id) {
  const result = (await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))
    .json();
  return result;
}

export async function getMealByID(id) {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const results = await fetch(`${endpoint}${id}`).then((response) => response.json());
  return results.meals[0];
}

export async function getDrinkByID(id) {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const results = await fetch(`${endpoint}${id}`).then((response) => response.json());
  return results.drinks[0];
}

export function getURLCategories(typeRecipes) {
  switch (typeRecipes) {
  case 'meals':
    return 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  case 'drinks':
    return 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  default:
    return [];
  }
}

export async function getCategories(typeRecipes) {
  const url = getURLCategories(typeRecipes);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export function getURLSearchByCategory(typeRecipes, category) {
  switch (typeRecipes) {
  case 'meals':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  case 'drinks':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  default:
    return '';
  }
}

export async function getSearchByCategory(typeRecipes, category) {
  const url = getURLSearchByCategory(typeRecipes, category);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getIngredients(typeRecipes) {
  const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  switch (typeRecipes) {
    case 'meals':
      return (await fetch(mealsUrl)).json();
    case 'drinks':
      return (await fetch(drinksUrl)).json();
    default:
      return '';
    }
}
