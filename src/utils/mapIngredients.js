export default function mapIngredients(recipe) {
  const ingredients = [];
  const maxIngredientsNumber = 20;
  for (let i = 1; i <= maxIngredientsNumber; i += 1) {
    if (
      recipe[`strIngredient${i}`] === null
        || recipe[`strIngredient${i}`] === ''
    ) {
      break;
    }
    ingredients.push(
      `${recipe[`strIngredient${i}`]
      } ${
        recipe[`strMeasure${i}`]}`,
    );
  }
  return ingredients;
}
