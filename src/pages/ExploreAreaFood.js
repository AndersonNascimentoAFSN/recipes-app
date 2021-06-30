import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import Footer from '../components/Footer';

export default function ExploreAreaFood() {
  return (
    <div>
      <Header title="Explorar Origem">
        <ButtonSearch />
      </Header>
      <Footer />
    </div>
  );
}
