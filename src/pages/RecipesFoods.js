import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';

export default function RecipesFoods() {
  return (
    <div>
      <Header title="Comidas">
        <ButtonSearch />
      </Header>
      <SearchBar />
    </div>
  );
}
