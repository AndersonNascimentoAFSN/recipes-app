import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import SearchBar from '../components/SearchBar';
import useSearchBarShowHide from '../hooks/useSearchBarShowHide';
import Footer from '../components/Footer';

export default function ExploreAreaDrinks() {
  const { appData: { showHide } } = useSearchBarShowHide();
  return (
    <div>
      <Header title="Explorar Origem">
        <ButtonSearch />
      </Header>
      { showHide && <SearchBar /> }
      <Footer />
    </div>
  );
}
