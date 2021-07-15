import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getDrinkById } from '../services/api';
import checkIngredients from '../utils/checkIngredients';
import verifyIngredientsInLocalStorage from '../utils/verifyIngredientsInLocalStorage';
import { mapDrinkIngredients } from '../utils/mapIngredients';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeContext from '../context/RecipesContext';
import './recipesInProgress.css';

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
    <div className="recipes-in-progress-page">
      <img
        src={ drink.strDrinkThumb }
        alt={ `${drink.strDrink} recipe` }
        data-testid="recipe-photo"
      />
      <div className="overflow-card">
        <div className="recipe-name-block">
          <h1
            data-testid="recipe-title"
            className="recipe__title"
          >
            { drink.strDrink }
          </h1>
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            { drink.strAlcoholic }
          </p>
        </div>
        <div className="recipe-interact-buttons-block">
          <button
            data-testid="share-btn"
            onClick={ () => handleShare() }
            type="button"
            className="interact__buttons"
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
            className="interact__buttons"
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite(drink.idDrink)
                ? blackHeartIcon
                : whiteHeartIcon }
              alt="Share"
            />
          </button>
        </div>
      </div>
      <h3> Ingredients </h3>
      <div className="ingredient-items-list">
        { mapDrinkIngredients(drink).map((ingredient, index) => (
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
              checked={ verifyIngredientsInLocalStorage('drink', drink, ingredient, index) }
              id={ `${ingredient}-check` }
            />
          </label>
        ))}
      </div>
      <h3> Instructions </h3>
      <p
        data-testid="instructions"
        className="recipe-instructions"
      >
        { drink.strInstructions }
      </p>
      <button
        onClick={ () => setShouldRedirect(true) }
        disabled={ !verifyIngredientsCheck() }
        data-testid="finish-recipe-btn"
        type="button"
        className="finish-recipe__button"
      >
        Finalizar receita
      </button>
    </div>
  );
}
