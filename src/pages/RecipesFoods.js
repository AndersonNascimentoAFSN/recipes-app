import React from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import Footer from '../components/Footer';

export default function RecipesFoods() {
  return (
    <div>
      <Header title="Comidas">
        <ButtonSearch />
      </Header>
      <Footer />
    </div>
  );
}
