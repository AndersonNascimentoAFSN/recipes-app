import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getMealByID, getCocktails } from '../services/api';
import ingredientsMesure from '../utils/ingredientsMesure';
import RecipeContext from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import './recipesPageContainer.css';

const mealPhoto = {
  maxWidth: '150px',
  maxHeight: '150px',
  margin: 'auto',
};

const startRecipe = {
  position: 'fixed',
  bottom: '0px',
};

export default function RecipesFoodsDetails(props) {
  const { match: { params: { id } } } = props;
  const {
    doneRecipes, favorites, setFavorites,
  } = useContext(RecipeContext);
  const [meal, setMeal] = useState([]);
  const [drinkAlternate, setDrinkAlternate] = useState([]);

  useEffect(() => {
    const getMeal = async () => {
      const results = await getMealByID(id);
      console.log(results);
      const drinkResults = await getCocktails('name', '');
      setMeal(results);
      const RECOMMENDED_DRINKS = 6;
      console.log(drinkResults.drinks.slice(0, RECOMMENDED_DRINKS));
      setDrinkAlternate(drinkResults.drinks.slice(0, RECOMMENDED_DRINKS));
    };

    getMeal();
  }, []);

  const NUMBER_OF_INGREDIENTS = 15;
  const ingredients = ingredientsMesure(meal, NUMBER_OF_INGREDIENTS);

  function isFavorite() {
    let favoriteFlag = false;
    favorites.forEach((recipe) => {
      if (recipe.id === id) favoriteFlag = true;
    });
    return favoriteFlag;
  }

  function alreadyDone() {
    let doneFlag = false;
    doneRecipes.forEach((recipe) => {
      if (recipe.id === id) doneFlag = true;
    });
    return doneFlag;
  }

  function inProgress() {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    return !!(inProgressRecipes.meals[id]);
  }

  function favoriteMeal() {
    if (isFavorite()) {
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

  function renderProgress() {
    if (alreadyDone()) {
      return (<div>Receita já feita</div>);
    }

    return (
      <Link
        to={ `/comidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
        style={ startRecipe }
      >
        { inProgress()
          ? 'Continuar Receita'
          : 'Iniciar Receita'}
      </Link>
    );
  }

  return (
    <div className="recipesPage__Container">
      <h1>Detalhes das receitas de comida</h1>
      <img
        src={ meal.strMealThumb }
        style={ mealPhoto }
        alt=""
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ meal.strMeal }</p>
      <p data-testid="recipe-category">{ meal.strCategory }</p>
      {ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </li>
      ))}
      <p data-testid="instructions">{ meal.strInstructions}</p>
      <iframe
        title="Youtube video"
        width="200"
        height="150"
        src={ meal.strYoutube }
        data-testid="video"
      />
      { isFavorite() ? (
        <button type="button" onClick={ () => favoriteMeal() }>
          <img
            src={ blackHeartIcon }
            data-testid="favorite-btn"
            alt="blackHeartIcon"
          />
        </button>)
        : (
          <button type="button" onClick={ () => favoriteMeal() }>
            <img
              src={ whiteHeartIcon }
              data-testid="favorite-btn"
              alt="whiteHeartIcon"
            />
          </button>)}
      <ShareButton id={ id } index={ 0 } type="comidas" />
      <div>
        {drinkAlternate.map((drink, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <li
              key={ index }
              data-testid={ `${index}-recomendation-title` }
            >
              {drink.strDrink}
            </li>
          </div>
        ))}
      </div>
      { renderProgress() }
    </div>
  );
}

RecipesFoodsDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};
