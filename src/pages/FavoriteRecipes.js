import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesFilters from '../components/RecipesFilters';
import FavoriteRecipeCardFood from '../components/FavoriteRecipeCardFood';
import FavoriteRecipeCardDrink from '../components/FavoriteRecipeCardDrink';
import useRecipesContext from '../hooks/useRecipesContext';
import './favoritePagesContainer.css';

export default function FavoriteRecipes() {
  const { favorites } = useRecipesContext();
  const { setFiltersFavorite, filtersFavorite } = useRecipesContext();
  const [recipesFiltered, setRecipesFiltered] = useState([]);

  useEffect(() => {
    const { type } = filtersFavorite;
    let filtered = [];
    switch (type) {
    case 'comida':
      filtered = favorites.filter((recipe) => recipe.type === 'comida');
      setRecipesFiltered(filtered);
      break;
    case 'bebida':
      filtered = favorites.filter((recipe) => recipe.type === 'bebida');
      setRecipesFiltered(filtered);
      break;
    default:
      setRecipesFiltered(favorites);
    }
  }, [filtersFavorite, favorites]);

  return (
    <div className="favoritePage__Container">
      <Header title="Receitas Favoritas">
        <div />
      </Header>

      <RecipesFilters
        setFilters={ setFiltersFavorite }
      />

      <div className="favoriteRecipesCard__wrapper">
        { recipesFiltered.map((favorite, index) => {
          if (favorite.type === 'comida') {
            return (
              <FavoriteRecipeCardFood
                key={ index }
                id={ favorite.id }
                index={ index }
                type="comidas"
                area={ favorite.area }
                category={ favorite.category }
                favoriteImg={ favorite.image }
                favoriteName={ favorite.name }
              />
            );
          }
          return (
            <FavoriteRecipeCardDrink
              key={ index }
              id={ favorite.id }
              index={ index }
              type="bebidas"
              favoriteImg={ favorite.image }
              favoriteName={ favorite.name }
              alcoholicOrNot={ favorite.alcoholicOrNot }
            />
          );
        })}
      </div>

    </div>
  );
}
