import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreButtons from '../components/ExploreButtons';

export default function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas">
        <div />
      </Header>

      <ExploreButtons type="bebidas" />

      <Footer />
    </div>
  );
}
