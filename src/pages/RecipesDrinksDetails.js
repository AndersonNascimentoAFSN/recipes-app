import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDrinkByID, getMeals } from '../services/api';
import ingredientsMesure from '../utils/ingredientsMesure';
import RecipeContext from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './recipesPageContainer.css';
import ShareButton from '../components/ShareButton';

const drinkPhoto = {
  maxWidth: '150px',
  maxHeight: '150px',
  margin: 'auto',
};

const startRecipe = {
  position: 'fixed',
  bottom: '0px',
};

export default function RecipesDrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const { doneRecipes, favorites, setFavorites,
  } = useContext(RecipeContext);
  const [drink, setDrink] = useState([]);
  const [mealAlternate, setMealAlternate] = useState([]);

  useEffect(() => {
    const getDrink = async () => {
      const results = await getDrinkByID(id);
      console.log(results);
      const mealResults = await getMeals('name', '');
      setDrink(results);
      const RECOMMENDED_MEALS = 6;
      setMealAlternate(mealResults.meals.slice(0, RECOMMENDED_MEALS));
    };

    getDrink();
  }, []);

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
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) return inProgressRecipes.cocktails[id] !== undefined;
    return false;
  }

  function favoriteMeal() {
    if (isFavorite()) {
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

  function renderProgress() {
    if (alreadyDone()) {
      return (<div>Receita já feita</div>);
    }
    return (
      <Link
        to={ `/bebidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
        style={ startRecipe }
      >
        { inProgress()
          ? 'Continuar Receita'
          : 'Iniciar Receita'}
      </Link>
    );
  }

  const NUMBER_OF_INGREDIENTS = 15;
  const ingredients = ingredientsMesure(drink, NUMBER_OF_INGREDIENTS);

  return (
    <div className="recipesPage__Container">
      <h1>Detalhes das receitas de bebida</h1>
      <img
        src={ drink.strDrinkThumb }
        style={ drinkPhoto }
        alt=""
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ drink.strDrink }</p>
      <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
      <p>{ drink.strCategory }</p>
      {ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </li>
      ))}
      <p data-testid="instructions">{ drink.strInstructions}</p>
      <iframe
        title="Youtube video"
        width="200"
        height="150"
        src={ drink.strYoutube }
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
      <ShareButton id={ id } index={ 0 } type="bebidas" />
      <div>
        {mealAlternate.map((meal, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <li
              key={ index }
              data-testid={ `${index}-recomendation-title` }
            >
              {meal.strMeal}
            </li>
          </div>
        ))}
      </div>
      { renderProgress() }
    </div>
  );
}

RecipesDrinksDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};
