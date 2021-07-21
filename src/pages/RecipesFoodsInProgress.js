import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../context/RecipesContext';
import { getMealById } from '../services/api';
import verifyIngredientsInLocalStorage from '../utils/verifyIngredientsInLocalStorage';
import prepareDoneRecipesObject from '../utils/prepareDoneRecipesObject';
import checkIngredients from '../utils/checkIngredients';
import mapIngredients from '../utils/mapIngredients';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './recipesInProgress.css';

export default function RecipesFoodsInProgress() {
  const { id } = useParams();
  const {
    favorites, setFavorites, doneRecipes, setDoneRecipes,
  } = useContext(RecipeContext);
  const [meal, setMeal] = useState();
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      const { meals } = await getMealById(id);
      setMeal(meals[0]);
    }
    fetchFood();
  }, [id]);

  function updateUsedIngredients(index, ingredient) {
    const label = document.getElementById(`${index}-ingredient-step`);
    label.style.textDecoration = 'line-through';
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setUsedIngredients([...usedIngredients, ingredient]);
    if (inProgressRecipes !== null) {
      const prevState = inProgressRecipes.meals[meal.idMeal] || [];
      inProgressRecipes.meals[meal.idMeal] = [...prevState, ingredient];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      return;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {
        [meal.idMeal]: [ingredient],
      },
    }));
  }

  function verifyIngredientsCheck() {
    const checkButtons = document.getElementsByClassName('ingredient-check');
    return checkIngredients(checkButtons);
  }

  function isFavorite(mealId) {
    const foundFavorite = favorites
      .find((fav) => fav.id === mealId && fav.type === 'comida');
    if (!foundFavorite) return false;
    return true;
  }

  function favoriteMeal() {
    if (isFavorite(meal.idMeal)) {
      setFavorites(
        favorites.filter((fav) => fav.id !== meal.idMeal),
      );
      return;
    }
    const newFavorite = {
      id: meal.idMeal,
      type: 'comida',
      area: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
    };
    setFavorites([
      ...favorites,
      newFavorite,
    ]);
  }

  function handleShare() {
    copy(`http://localhost:3000/comidas/${meal.idMeal}`);
    setIsLinkCopied(true);
    const twoSecondsInMs = 2000;
    setTimeout(() => {
      setIsLinkCopied(false);
    }, twoSecondsInMs);
  }

  function finishRecipe() {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete inProgressRecipes.meals[meal.idMeal];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const doneRecipeObject = prepareDoneRecipesObject(meal, 'comida');
    setDoneRecipes([...doneRecipes, doneRecipeObject]);
    setShouldRedirect(true);
  }

  if (shouldRedirect) {
    return <Redirect to="/receitas-feitas" />;
  }

  if (!meal) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipes-in-progress-page">
      <img
        src={ meal.strMealThumb }
        alt={ `${meal.strMeal} recipe` }
        data-testid="recipe-photo"
      />
      <div className="overflow-card">
        <div className="recipe-name-block">
          <h1
            data-testid="recipe-title"
            className="recipe__title"
          >
            { meal.strMeal }
          </h1>
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            { meal.strCategory }
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
              src={ isFavorite(meal.idMeal)
                ? blackHeartIcon
                : whiteHeartIcon }
              alt="Share"
            />
          </button>
        </div>
      </div>
      <h3> Ingredients </h3>
      <div className="ingredient-items-list">
        { mapIngredients(meal).map((ingredient, index) => (
          <label
            data-testid={ `${index}-ingredient-step` }
            id={ `${index}-ingredient-step` }
            key={ index }
            htmlFor={ `${ingredient}-check` }
          >
            <input
              type="checkbox"
              checked={ verifyIngredientsInLocalStorage('meal', meal, ingredient, index) }
              onClick={ () => updateUsedIngredients(index, ingredient) }
              className="ingredient-check"
              id={ `${ingredient}-check` }
            />
            { ingredient }
          </label>
        ))}
      </div>
      <h3> Instructions </h3>
      <p
        data-testid="instructions"
        className="recipe-instructions"
      >
        { meal.strInstructions }
      </p>
      <button
        onClick={ () => finishRecipe() }
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
