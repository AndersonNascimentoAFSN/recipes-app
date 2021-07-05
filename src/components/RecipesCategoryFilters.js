import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default function RecipesCategoryFilters({ typeRecipes }) {
  const [recipesCategories, setRecipesCategories] = useState([]);

  useEffect(() => {
    getCategories(typeRecipes).then((data) => {
      const quantityCategories = 5;
      const categoriesList = data[typeRecipes]
        .filter((_, index) => index < quantityCategories);
      setRecipesCategories(categoriesList);
    });
  }, [typeRecipes]);
  return (
    <div>
      {recipesCategories.map(({ strCategory }, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

RecipesCategoryFilters.propTypes = {
  typeRecipes: PropTypes.string.isRequired,
};
