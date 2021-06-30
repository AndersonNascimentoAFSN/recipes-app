import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';

export default function ExploreAreaFood() {
  return (
    <div>
      <Header title="Explorar Origem">
        <ButtonSearch />
      </Header>
      <SearchBar />
    </div>
  );
}
