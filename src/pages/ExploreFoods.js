import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from '../components/ExploreButtons';

export default function ExploreFoods() {
  return (
    <div>
      <Header title="Explorar Comidas">
        <div />
      </Header>

      <ExploreButtons type="comidas" />

      <Footer />
    </div>
  );
}
