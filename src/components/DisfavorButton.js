import React from 'react';
import PropTypes from 'prop-types';
import disfavorIcon from '../images/blackHeartIcon.svg';
import useRecipesContext from '../hooks/useRecipesContext';

export default function DisfavorButton({ index, id }) {
  const { setFavorites } = useRecipesContext();
  function handleDisfavor() {
    const favoriteRecipesFiltered = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((recipeFavorite) => recipeFavorite.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesFiltered));

    setFavorites(favoriteRecipesFiltered);
  }

  return (
    <button
      type="button"
      onClick={ handleDisfavor }
    >
      <img
        src={ disfavorIcon }
        alt="share recipes"
        data-testid={ `${index}-horizontal-favorite-btn` }
      />
    </button>
  );
}

DisfavorButton.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
