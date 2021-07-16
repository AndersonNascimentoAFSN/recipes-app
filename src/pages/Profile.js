import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './profile.css';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const localStorageKeys = [
    'user',
    'mealsToken',
    'cocktailsToken',
    'doneRecipes',
    'favoriteRecipes',
    'inProgressRecipes',
  ];

  function handleResetStorage() {
    localStorageKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  return (
    <div className="profile-page">
      <Header title="Perfil">
        <div />
      </Header>
      <div>
        <div className="user-login-info">
          <p>
            Logged as:
          </p>
          <h3
            data-testid="profile-email"
          >
            { email }
          </h3>
        </div>
        <div>
          <h2>
            Navigate to:
          </h2>
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            <Link to="receitas-feitas">
              Receitas Feitas
            </Link>
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            <Link to="receitas-favoritas">
              Receitas Favoritas
            </Link>
          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => handleResetStorage() }
          >
            <Link to="/">
              Sair
            </Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
