import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHiden from '../hooks/useSearchBarShowHiden';

export default function ExploreAreaFood() {
  const { searchBarShowHiden } = useSearchBarShowHiden();
  return (
    <div>
      <Header title="Explorar Origem">
        <ButtonSearch />
      </Header>
      { searchBarShowHiden && <SearchBar /> }
    </div>
  );
}
