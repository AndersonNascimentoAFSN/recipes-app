import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';

export default function ExploreAreaFood() {
  const { appData: { showHide } } = useSearchBarShowHide();
  return (
    <div>
      <Header title="Explorar Origem">
        <ButtonSearch />
      </Header>
      { showHide && <SearchBar /> }
    </div>
  );
}
