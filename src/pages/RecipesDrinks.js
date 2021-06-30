import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';

export default function RecipesDrinks() {
  return (
    <div>
      <Header title="Bebidas">
        <ButtonSearch />
      </Header>
      <SearchBar />
    </div>
  );
}
