import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getDrinkById } from '../services/api';
import checkIngredients from '../utils/checkIngredients';
import mapDrinkIngredients from '../utils/mapDrinkIngredients';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeContext from '../context/RecipesContext';

export default function RecipesDrinksInProgress() {
  const { id } = useParams();
  const { favorites, setFavorites } = useContext(RecipeContext);
  const [drink, setDrink] = useState();
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      console.log('ID:', id);
      const { drinks } = await getDrinkById(id);
      setDrink(drinks[0]);
    }
    fetchFood();
  }, []);

  function verifyDrinkIngredients(recipe) {
    return mapDrinkIngredients(recipe);
  }

  function updateUsedIngredients(index, ingredient) {
    const label = document.getElementById(`${index}-ingredient-step`);
    label.style.textDecoration = 'line-through';
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setUsedIngredients([...usedIngredients, ingredient]);
    if (inProgressRecipes !== null) {
      inProgressRecipes.cocktails[drink.idDrink].push(ingredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      return;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        [drink.idDrink]: [ingredient],
      },
      meals: {},
    }));
  }

  function verifyIngredientUse(index, ingredient) {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) return;
    const drinkKey = inProgressRecipes.cocktails[drink.idDrink];
    if (drinkKey && drinkKey.includes(ingredient) && drink) {
      const oneSecondInMs = 1000;
      setTimeout(() => {
        const ingredientItem = document.getElementById(`${index}-ingredient-step`);
        ingredientItem.style.textDecoration = 'line-through';
      }, oneSecondInMs);
      return true;
    }
  }

  function verifyIngredientsCheck() {
    const checkButtons = document.getElementsByClassName('ingredient-check');
    return checkIngredients(checkButtons);
  }

  function isFavorite(drinkId) {
    const foundRecipe = favorites
      .find((favRecipe) => favRecipe.id === drinkId
      && favRecipe.type === 'bebida');
    if (!foundRecipe) return false;
    return true;
  }

  function favoriteMeal() {
    if (isFavorite(drink.idDrink)) {
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

  function handleShare() {
    copy(`http://localhost:3000/bebidas/${drink.idDrink}`);
    setIsLinkCopied(true);
    const twoSecondsInMs = 2000;
    setTimeout(() => {
      setIsLinkCopied(false);
    }, twoSecondsInMs);
  }

  if (shouldRedirect) {
    return <Redirect to="/receitas-feitas" />;
  }

  if (!drink) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img
        src={ drink.strDrinkThumb }
        alt={ `${drink.strDrink} recipe` }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { drink.strDrink }
      </h1>
      <button
        data-testid="share-btn"
        onClick={ () => handleShare() }
        type="button"
      >
        <img
          src={ shareIcon }
          alt="Share"
        />
        { isLinkCopied && <p>Link copiado!</p> }
      </button>
      <button
        onClick={ () => favoriteMeal() }
        type="button"
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite(drink.idDrink)
            ? blackHeartIcon
            : whiteHeartIcon }
          alt="Share"
        />
      </button>
      <p
        data-testid="recipe-category"
      >
        { drink.strAlcoholic }
      </p>
      { verifyDrinkIngredients(drink).map((ingredient, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          id={ `${index}-ingredient-step` }
          key={ index }
          htmlFor={ `${ingredient}-check` }
        >
          { ingredient }
          <input
            type="checkbox"
            onClick={ () => updateUsedIngredients(index, ingredient) }
            className="ingredient-check"
            checked={ verifyIngredientUse(index, ingredient) }
            id={ `${ingredient}-check` }
          />
        </label>
      ))}
      <p
        data-testid="instructions"
      >
        { drink.strInstructions }
      </p>
      <button
        onClick={ () => setShouldRedirect(true) }
        disabled={ !verifyIngredientsCheck() }
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar receita
      </button>
    </div>
  );
}
