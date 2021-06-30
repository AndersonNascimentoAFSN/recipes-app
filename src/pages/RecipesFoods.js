import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHiden from '../hooks/useSearchBarShowHiden';

export default function RecipesFoods() {
  const { searchBarShowHiden } = useSearchBarShowHiden();
  return (
    <div>
      <Header title="Comidas">
        <ButtonSearch />
      </Header>
      { searchBarShowHiden && <SearchBar /> }
    </div>
  );
}
