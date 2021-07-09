import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ index, id, type }) {
  function onClickClipboard() {
    const url = `${window.location.href
      .split('/receitas-feitas')[0]}/${type}/${id}`;

    navigator.clipboard.writeText(url);
  }

  return (
    <button
      type="button"
      onClick={ onClickClipboard }
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
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
