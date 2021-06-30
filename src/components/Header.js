import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import './header.css';

export default function Header({ title, children = '' }) {
  return (
    <header className="header">
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title" className="header__title">{title}</h1>
      {children}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Header.defaultProps = {
  children: PropTypes.node,
};
