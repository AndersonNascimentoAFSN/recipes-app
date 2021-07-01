import { useContext } from 'react';
import { AppContext } from '../utils/AppContext';

export default function useSearchBarShowHide() {
  const useSearchBar = useContext(AppContext);
  return (
    useSearchBar
  );
}
