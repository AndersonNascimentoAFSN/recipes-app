import { useContext } from 'react';
import SearchBarContext from '../utils/context/SearchBarContext';

export default function useSearchBarShowHiden() {
  const useSearchBar = useContext(SearchBarContext);
  return (
    useSearchBar
  );
}
