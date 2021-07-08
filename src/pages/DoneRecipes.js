import React from 'react';
import Header from '../components/Header';
import RecipesDoneFilters from '../components/RecipesDoneFilters';
import DoneRecipeCardFood from '../components/DoneRecipeCardFood';
import DoneRecipeCardDrink from '../components/DoneRecipeCardDrink';
import shareIcon from '../images/shareIcon.svg';
import './doneRecipes.css';

export default function DoneRecipes() {
  const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div className="doneRecipes__container">
      <Header title="Receitas Feitas">
        <div />
      </Header>

      <RecipesDoneFilters />

      { doneRecipesArray.map((recipe, index) => {
        if (recipe.type === 'comida') {
          return (
            <DoneRecipeCardFood
              key={ index }
              index={ index }
              area={ recipe.area }
              category={ recipe.category }
              shareIcon={ shareIcon }
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
            index={ index }
            shareIcon={ shareIcon }
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
