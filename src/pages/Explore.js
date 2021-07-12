import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './explorePage.css';

export default function Explore() {
  return (
    <div className="explorePage__Container">

      <Header title="Explorar">
        <div />
      </Header>

      <div className="exploreLinks__container">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
          className="explore__links"
        >
          Explorar Comidas
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
          className="explore__links"
        >
          Explorar Bebidas
        </Link>
      </div>

      <Footer />
    </div>
  );
}
