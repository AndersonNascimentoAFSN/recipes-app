import React from 'react';
import PropTypes from 'prop-types';
import disfavorIcon from '../images/blackHeartIcon.svg';

export default function DisfavorButton({ index }) {
  // function handleDisfavor() {

  // }

  return (
    <button
      type="button"
      // click={ handleDisfavor }
    >
      <img
        src={ disfavorIcon }
        alt="share recipes"
        data-testid={ `${index}-horizontal-favorite-btn` }
      />
    </button>
  );
}

DisfavorButton.propTypes = {
  index: PropTypes.number.isRequired,
};
