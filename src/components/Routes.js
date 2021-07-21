import React from 'react';
import { Route, Switch } from 'react-router';
import DoneRecipes from '../pages/DoneRecipes';
import Explore from '../pages/Explore';
import ExploreAreaFood from '../pages/ExploreAreaFood';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreIngredientsDrinks from '../pages/ExploreIngredientsDrinks';
import ExploreIngredientsFood from '../pages/ExploreIngredientsFood';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import RecipesDrinks from '../pages/RecipesDrinks';
import RecipesDrinksDetails from '../pages/RecipesDrinksDetails';
import RecipesDrinksInProgress from '../pages/RecipesDrinksInProgress';
import RecipesFoods from '../pages/RecipesFoods';
import RecipesFoodsDetails from '../pages/RecipesFoodsDetails';
import RecipesFoodsInProgress from '../pages/RecipesFoodsInProgress';
import NotFound from './NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/comidas/:id" component={ RecipesFoodsDetails } />
      <Route exact path="/bebidas/:id" component={ RecipesDrinksDetails } />
      <Route exact path="/comidas" component={ RecipesFoods } />
      <Route exact path="/bebidas" component={ RecipesDrinks } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/perfil" component={ Profile } />
      <Route path="/comidas/:id/in-progress" component={ RecipesFoodsInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ RecipesDrinksInProgress } />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExploreIngredientsDrinks }
      />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredientsFood } />
      <Route path="/explorar/comidas/area" component={ ExploreAreaFood } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/" component={ Login } />
      <Route path="/*" component={ NotFound }/>
    </Switch>
  );
}

export default Routes;
