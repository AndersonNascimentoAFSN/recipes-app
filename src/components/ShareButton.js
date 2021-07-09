import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ index }) {
  return (
    <button
      type="button"
      onClick={ () => {
        navigator.clipboard.writeText(window.location.href);
        global.alert('Link copiado!');
      } }
    >
      <img
        src={ shareIcon }
        alt="share recipes"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </button>
  );
}

ShareButton.propTypes = {
  index: PropTypes.number.isRequired,
};
