import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesDoneFilters from '../components/RecipesDoneFilters';
import DoneRecipeCardFood from '../components/DoneRecipeCardFood';
import DoneRecipeCardDrink from '../components/DoneRecipeCardDrink';
import './doneRecipes.css';
import RecipesContext from '../context/RecipesContext';

export default function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesContext);

  return (
    <div className="doneRecipes__container">
      <Header title="Receitas Feitas">
        <div />
      </Header>

      <RecipesDoneFilters />

      { doneRecipes.map((recipe, index) => {
        if (recipe.type === 'comida') {
          return (
            <DoneRecipeCardFood
              key={ index }
              id={ recipe.id }
              index={ index }
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
            recipeImg={ recipe.image }
            recipeName={ recipe.name }
            doneDate={ recipe.doneDate }
            alcoholicOrNot={ recipe.alcoholicOrNot }
          />
        );
      })}
    </div>
  );
}
