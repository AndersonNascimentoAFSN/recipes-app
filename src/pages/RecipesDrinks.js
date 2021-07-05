import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import Footer from '../components/Footer';

export default function RecipesDrinks() {
  return (
    <div>
      <Header title="Bebidas">
        <ButtonSearch />
      </Header>
      <Footer />
    </div>
  );
}
