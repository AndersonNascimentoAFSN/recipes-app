export default function ingredientsMesure(myRecipe, Ingredients) {
  const INGREDIENTS = Ingredients;
  const arrayOfIngredients = [];

  for (let index = 1; index <= INGREDIENTS; index += 1) {
    const ingredient = `strIngredient${index}`;
    const measurement = `strMeasure${index}`;
    if (myRecipe[ingredient]) {
      if (myRecipe[measurement]) {
        arrayOfIngredients.push(`${myRecipe[ingredient]} - ${myRecipe[measurement]}`);
      } else {
        arrayOfIngredients.push(`${myRecipe[ingredient]}`);
      }
    }
  }
  return arrayOfIngredients;
}
