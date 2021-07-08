import React from 'react';
import RecipeProvider from './context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';

function App() {
  return (
    <RecipeProvider>
      <Routes />
    </RecipeProvider>
  );
}

export default App;
