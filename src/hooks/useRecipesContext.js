import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function useRecipesContext() {
  return useContext(RecipesContext);
}
export default useRecipesContext;
