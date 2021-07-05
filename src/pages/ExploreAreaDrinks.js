import React, { Component } from 'react';
import Header from '../components/Header';
import ButtonSearch from '../components/ButtonSearch';
import Footer from '../components/Footer';

export default class ExploreAreaDrinks extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar Origem">
          <ButtonSearch />
        </Header>
        <Footer />
      </div>
    );
  }
}
