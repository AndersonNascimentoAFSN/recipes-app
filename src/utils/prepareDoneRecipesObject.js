export default function prepareDoneRecipesObject(recipe, type) {
  function appendZero(number) {
    const lastSingleDigitNumber = 9;
    if (number <= lastSingleDigitNumber) return `0${number}`;
    return number;
  }
  const date = new Date();
  const formatedDay = appendZero(date.getDate().toString());
  const formatedMonth = appendZero((date.getMonth() + 1).toString());
  const formatedDate = `${formatedDay}/${formatedMonth}/${date.getFullYear()}`;
  return {
    id: recipe.idMeal || recipe.idDrink,
    type,
    area: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: formatedDate,
    tags: [recipe.strTags || ''],
  };
}
