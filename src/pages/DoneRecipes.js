import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesFilters from '../components/RecipesFilters';
import DoneRecipeCardFood from '../components/DoneRecipeCardFood';
import DoneRecipeCardDrink from '../components/DoneRecipeCardDrink';
import './doneRecipes.css';
import useRecipesContext from '../hooks/useRecipesContext';

export default function DoneRecipes() {
  const { filtersDone } = useRecipesContext();
  const { setFiltersDone } = useRecipesContext();
  const { doneRecipes } = useRecipesContext();
  const [recipesFiltered, setRecipesFiltered] = useState([]);

  useEffect(() => {
    const { type } = filtersDone;
    let filtered = [];
    switch (type) {
    case 'comida':
      filtered = doneRecipes.filter((recipe) => recipe.type === 'comida');
      setRecipesFiltered(filtered);
      break;
    case 'bebida':
      filtered = doneRecipes.filter((recipe) => recipe.type === 'bebida');
      setRecipesFiltered(filtered);
      break;
    default:
      setRecipesFiltered(doneRecipes);
    }
  }, [setRecipesFiltered, filtersDone, doneRecipes]);

  return (
    <div className="doneRecipes__container">
      <Header title="Receitas Feitas">
        <div />
      </Header>

      <RecipesFilters
        setFilters={ setFiltersDone }
      />

      <div className="doneRecipesCard__wrapper">
        { recipesFiltered.map((recipe, index) => {
          if (recipe.type === 'comida') {
            return (
              <DoneRecipeCardFood
                key={ index }
                id={ recipe.id }
                index={ index }
                type="comidas"
                area={ recipe.area }
                category={ recipe.category }
                recipeImg={ recipe.image }
                recipeName={ recipe.name }
                recipeTags={ recipe.tags }
                doneDate={ recipe.doneDate }
              />
            );
          }
          return (
            <DoneRecipeCardDrink
              key={ index }
              id={ recipe.id }
              index={ index }
              type="bebidas"
              recipeImg={ recipe.image }
              recipeName={ recipe.name }
              doneDate={ recipe.doneDate }
              alcoholicOrNot={ recipe.alcoholicOrNot }
            />
          );
        })}
      </div>
    </div>
  );
}
