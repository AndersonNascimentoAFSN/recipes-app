import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './profile.css';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

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
          >
            <Link to="receitas-feitas"/>
            Receitas Feitas
          </button>
          <button
            data-testid="profile-favorite-btn"
          >
            <Link to="receitas-favoritas"/>
            Receitas Favoritas
          </button>
          <button
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
