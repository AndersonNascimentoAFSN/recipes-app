import { useContext } from 'react';
import RecipeContext from '../context/RecipesContext';

function useSearchRecipes() {
  return useContext(RecipeContext);
}
export default useSearchRecipes;
