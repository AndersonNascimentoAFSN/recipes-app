import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getMealByID, getCocktails } from '../services/api';
import ingredientsMesure from '../utils/ingredientsMesure';
import RecipeContext from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButton from '../components/ShareButton';
import './recipesDetailsPage.css';

export default function RecipesFoodsDetails(props) {
  const { match: { params: { id } } } = props;
  const {
    doneRecipes, favorites, setFavorites,
  } = useContext(RecipeContext);
  const [meal, setMeal] = useState([]);
  const [drinkAlternate, setDrinkAlternate] = useState([]);

  useEffect(() => {
    const getMeal = async () => {
      const result = await getMealByID(id);
      const drinkResults = await getCocktails('name', '');
      const resultWithEmbedVideo = {
        ...result,
        strYoutube: `https://www.youtube.com/embed/${result.strYoutube.split('v=')[1]}`,
      };
      setMeal(resultWithEmbedVideo);
      const RECOMMENDED_DRINKS = 6;
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
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) return inProgressRecipes.meals[id] !== undefined;
    return false;
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
      return (
        <span className="wrapper__buttons__realizedRecipe">
          Receita já feita
        </span>);
    }
    return (
      <Link
        to={ `/comidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
        className="wrapper__buttons__startRecipe"
      >
        { inProgress()
          ? 'Continuar Receita'
          : 'Iniciar Receita'}
      </Link>
    );
  }

  return (
    <div className="c-recipesDetails">
      <header className="c-header">
        <img
          src={ meal.strMealThumb }
          alt="recipe"
          data-testid="recipe-photo"
          className="c-banner"
        />

        <div className="c-info">
          <div>
            <h1
              className="c-info__title"
              data-testid="recipe-title"
            >
              { meal.strMeal }
            </h1>
            <span
              className="c-info__category"
              data-testid="recipe-category"
            >
              { meal.strCategory }
            </span>
          </div>

          <div className="c-wrapper__icons">
            { isFavorite() ? (
              <button
                type="button"
                className="c-icons__blackHeartIcon"
                onClick={ () => favoriteMeal() }
              >
                <img
                  src={ blackHeartIcon }
                  data-testid="favorite-btn"
                  alt="blackHeartIcon"
                />
              </button>)
              : (
                <button
                  type="button"
                  className="c-icons__whiteHeartIcon"
                  onClick={ () => favoriteMeal() }
                >
                  <img
                    src={ whiteHeartIcon }
                    data-testid="favorite-btn"
                    alt="whiteHeartIcon"
                  />
                </button>)}

            <ShareButton id={ id } index={ 0 } type="comidas" />
          </div>
        </div>
      </header>

      <div className="c-ingredients">
        <h2 className="c-ingredients__title">Ingredients</h2>
        {ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>
        ))}
      </div>

      <div className="c-instructions">
        <h2 className="c-instructions__title">Instructions</h2>
        <p data-testid="instructions">{ meal.strInstructions}</p>
      </div>

      <div className="c-video">
        <iframe
          title="Youtube video"
          width="340"
          height="160"
          src={ meal.strYoutube }
          data-testid="video"
        />
      </div>

      <div className="c-drinkAlternative__wrapper">
        <div className="c-drinkAlternative__cards">
          {drinkAlternate.map((drink, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="c-drinkAlternative__card"
            >
              <img
                src={ drink.strDrinkThumb }
                alt="drink"
                className="c-drinkAlternative__img"
              />
              <div className="c-drinkAlternative__wrapper__title">
                <span>{drink.strAlcoholic}</span>
                <span
                  key={ index }
                  data-testid={ `${index}-recomendation-title` }
                >
                  {drink.strDrink}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="c-wrapper__buttons">
        { renderProgress() }
      </div>
    </div>
  );
}

RecipesFoodsDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};
