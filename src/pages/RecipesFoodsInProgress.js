import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../context/RecipesContext';
import { getMealById } from '../services/api';
import verifyIngredientsInLocalStorage from '../utils/verifyIngredientsInLocalStorage';
import checkIngredients from '../utils/checkIngredients';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipesFoodsInProgress() {
  const { id } = useParams();
  const { favorites, setFavorites } = useContext(RecipeContext);
  const [meal, setMeal] = useState();
  const [usedIngredients, setUsedIngredients] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      console.log('ID:', id);
      const { meals } = await getMealById(id);
      setMeal(meals[0]);
    }
    fetchFood();
  }, []);

  function mapMealIngredients(recipe) {
    const ingredients = [];
    const maxIngredientsNumber = 20;
    for (let i = 1; i <= maxIngredientsNumber; i += 1) {
      if (recipe[`strIngredient${i}`] === '') {
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

  function updateUsedIngredients(index, ingredient) {
    const label = document.getElementById(`${index}-ingredient-step`);
    label.style.textDecoration = 'line-through';
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setUsedIngredients([...usedIngredients, ingredient]);
    if (inProgressRecipes !== null) {
      inProgressRecipes.meals[meal.idMeal].push(ingredient);
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

  if (shouldRedirect) {
    return <Redirect to="/receitas-feitas" />;
  }

  if (!meal) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img
        src={ meal.strMealThumb }
        alt={ `${meal.strMeal} recipe` }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { meal.strMeal }
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
          src={ isFavorite(meal.idMeal)
            ? blackHeartIcon
            : whiteHeartIcon }
          alt="Share"
        />
      </button>
      <p
        data-testid="recipe-category"
      >
        { meal.strCategory }
      </p>
      { mapMealIngredients(meal).map((ingredient, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          id={ `${index}-ingredient-step` }
          key={ index }
          htmlFor={ `${ingredient}-check` }
        >
          { ingredient }
          <input
            type="checkbox"
            checked={ verifyIngredientsInLocalStorage(meal, ingredient, index) }
            onClick={ () => updateUsedIngredients(index, ingredient) }
            className="ingredient-check"
            id={ `${ingredient}-check` }
          />
        </label>
      ))}
      <p
        data-testid="instructions"
      >
        { meal.strInstructions }
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
