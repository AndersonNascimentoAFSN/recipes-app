import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCocktails, getMeals } from '../services/api';

export default function ExploreButtons({ type }) {
  const history = useHistory();
  function handleSurprise() {
    switch (type) {
    case 'comidas':
      getMeals('surprise').then((data) => {
        const path = `/comidas/${data.meals[0].idMeal}`;
        history.push(path);
      });
      break;
    case 'bebidas':
      getCocktails('surprise').then((data) => {
        const path = `/bebidas/${data.drinks[0].idDrink}`;
        history.push(path);
      });
      break;
    default:
      return [];
    }
  }

  return (
    <div>
      <Link
        to={ `/explorar/${type}/ingredientes` }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      { type === 'comidas'
        ? (
          <Link
            to={ `/explorar/${type}/area` }
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Link>
        )
        : ''}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleSurprise }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

ExploreButtons.propTypes = {
  type: PropTypes.string.isRequired,
};
