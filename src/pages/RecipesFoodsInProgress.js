import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeContext from '../context/RecipesContext';
import { getMealById } from '../services/api';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipesFoodsInProgress() {
  const { id } = useParams();
  const { favorites, setFavorites } = useContext(RecipeContext);
  const [ meal, setMeal ] = useState();
  const [ usedIngredients, setUsedIngredients ] = useState([]);
  const [ shouldRedirect, setShouldRedirect ] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      console.log("ID:", id);
      const { meals } = await getMealById(id);
      setMeal(meals[0]);
    }
    fetchFood();
  }, [])

  function mapMealIngredients(meal) {
    const ingredients = [];
    for(var i=1;i<=20;i++) {
      if(meal[`strIngredient${i}`] === "") {
        break;
      }
      ingredients.push(
        meal[`strIngredient${i}`]
        + " "
        + meal[`strMeasure${i}`]
      );
    }
    return ingredients;
  }

  function updateUsedIngredients(index, ingredient) {
    const label = document.getElementById(`${index}-ingredient-step`);
    label.style.textDecoration = 'line-through';
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(inProgressRecipes);
    setUsedIngredients([...usedIngredients, ingredient]);
    console.log(usedIngredients)
    if (inProgressRecipes !== null) {
      inProgressRecipes.meals[meal.idMeal] = usedIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {
          [meal.idMeal]: usedIngredients,
        }
      }))
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {
          [meal.idMeal]: usedIngredients,
        }
      }));
    }
  }

  function verifyIngredientsCheck() {
    const checkButtons = document.getElementsByClassName('ingredient-check');
    if (checkButtons.length > 0) {
      for(var i=0;i<checkButtons.length;i++){
        if (checkButtons[i].checked === false) return false;
      }
    } else {
      return false;
    }
    return true;
  }

  function favoriteMeal() {
    if (isFavorite(meal.idMeal)) {
      setFavorites(
        favorites.filter(({id}) => id !== meal.idMeal)
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
    ])
  }

  function isFavorite(mealId) {
    const isFavorite = favorites
      .find(({id, type})=> id === mealId && type === 'comida');
    if (!isFavorite) return false;
    return true;
  }

  if(shouldRedirect) {
    return <Redirect to="/receitas-feitas"/>
  }

  if (!meal) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      <img
        src={meal.strMealThumb}
        alt={`${meal.strMeal} recipe`}
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { meal.strMeal }
      </h1>
      <button
        data-testid="share-btn"
        onClick={() => {
          copy(meal.strSource)
          global.alert('Link copiado!');
        }}
      >
        <img
          src={ shareIcon }
          alt="Share"
        />
      </button>
      <button
        data-testid="favorite-btn"
        onClick={ () => favoriteMeal() }
      >
        <img
          src={ isFavorite(meal.idMeal)
            ? blackHeartIcon
            : whiteHeartIcon
          }
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
          data-testid={`${index}-ingredient-step`}
          id={`${index}-ingredient-step`}
        >
          { ingredient }
          <input
            type="checkbox"
            onClick={ () => updateUsedIngredients(index, ingredient) }
            className="ingredient-check"
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
      >
        Finalizar receita
      </button>
    </div>
  );
}
