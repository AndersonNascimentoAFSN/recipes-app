import React from 'react';
import RecipeProvider from './context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/Routes';

function App() {
  return (
    <RecipeProvider>
      <div className="app">
        <Routes />
      </div>
    </RecipeProvider>
  );
}

export default App;
