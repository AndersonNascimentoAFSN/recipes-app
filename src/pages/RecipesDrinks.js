import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHiden from '../hooks/useSearchBarShowHiden';

export default function RecipesDrinks() {
  const { searchBarShowHiden } = useSearchBarShowHiden();
  return (
    <div>
      <Header title="Bebidas">
        <ButtonSearch />
      </Header>
      { searchBarShowHiden && <SearchBar /> }
    </div>
  );
}
