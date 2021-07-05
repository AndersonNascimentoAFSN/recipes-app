export default async function getRecipes(type, search, number) {
  switch (type) {
  case 'meals':
    return (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}?${number}`)).json();
  case 'cocks':
    return (await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)).json();
  default:
    return [];
  }
}
