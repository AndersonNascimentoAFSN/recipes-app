import React from 'react';
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
            Done recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
          >
            Favorite recipes
          </button>
          <button
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
