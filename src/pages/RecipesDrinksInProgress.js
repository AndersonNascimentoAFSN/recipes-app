import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { getDrinkById } from '../services/api';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeContext from '../context/RecipesContext';

export default function RecipesDrinksInProgress() {
  const { id } = useParams();
  const { favorites, setFavorites } = useContext(RecipeContext);
  const [ drink, setDrink ] = useState();
  const [ usedIngredients, setUsedIngredients ] = useState([]);
  const [ shouldRedirect, setShouldRedirect ] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      console.log("ID:", id);
      const { drinks } = await getDrinkById(id);
      setDrink(drinks[0]);
    }
    fetchFood();
  }, [])

  function mapDrinkIngredients(drink) {
    const ingredients = [];
    for(var i=1;i<=20;i++) {
      if(
        drink[`strIngredient${i}`] === ""
        || drink[`strIngredient${i}`] === null) {
        break;
      }
      ingredients.push(
        drink[`strIngredient${i}`]
        + " "
        + drink[`strMeasure${i}`]
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
      inProgressRecipes.cocktails[drink.idDrink] = usedIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {
          [drink.idDrink]: usedIngredients,
        },
        meals: {}
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
    if (isFavorite(drink.idDrink)) {
      setFavorites(
        favorites.filter(({id}) => id !== drink.idDrink)
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
    ])
  }

  function isFavorite(drinkId) {
    const isFavorite = favorites
      .find(({id, type})=> id === drinkId && type === 'bebida');
    if (!isFavorite) return false;
    return true;
  }

  if(shouldRedirect) {
    return <Redirect to="/receitas-feitas"/>
  }

  if (!drink) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      <img
        src={drink.strDrinkThumb}
        alt={`${drink.strDrink} recipe`}
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { drink.strDrink }
      </h1>
      <button
        data-testid="share-btn"
        onClick={() => {
          copy(drink.strSource)
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
          src={ isFavorite(drink.idDrink)
            ? blackHeartIcon
            : whiteHeartIcon
          }
          alt="Share"
        />
      </button>
      <p
        data-testid="recipe-category"
      >
        { drink.strCategory }
      </p>
      { mapDrinkIngredients(drink).map((ingredient, index) => (
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
        { drink.strInstructions }
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
