import React from 'react';
import { Route, Switch } from 'react-router';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login }/>
      {/* <Route path="/comida" component={ Comidas }/> */}
      {/* <Route path="/bebidas" component={ Bebidas }/> */}
      {/* <Route path="/comida/:id" component={ Detalhes }/> */}
      {/* <Route path="/bebidas/:id" component={ Detalhes }/> */}
      {/* <Route path="/comidas/:id/in-progress" component={ InProgress }/> */}
      {/* <Route path="/bebidas/:id/in-progress" component={ InProgress }/> */}
      {/* <Route path="/explorar" component={ Explore }/> */}
      {/* <Route path="/explorar/comidas" component={ ExploreFood }/> */}
      {/* <Route path="/explorar/bebidas" component={ ExploreDrink }/> */}
      {/* <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients }/> */}
      {/* <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients }/> */}
      {/* <Route path="/explorar/comidas/area" component={ ExploreIngredients }/> */}
      {/* <Route path="/perfil" component={ Profile }/> */}
      {/* <Route path="/receitas-feitas" component={ DoneRecipes }/> */}
      {/* <Route path="/receitas-favoritas" component={ FavoriteRecipes }/> */}
    </Switch>
  );
}

export default Routes;