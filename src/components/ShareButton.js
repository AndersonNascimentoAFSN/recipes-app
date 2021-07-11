import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import Toast from './Toast';

export default function ShareButton({ index, id, type }) {
  const toastShow = () => {
    const timerShowToast = 1500;
    const toastElement = document.querySelector('.snackbar');
    toastElement.classList.add('show');
    setTimeout(() => {
      toastElement.classList.remove('show');
    }, timerShowToast);
  };

  function onClickClipboard() {
    const url = `${window.location.href
      .split('/receitas-feitas')[0]}/${type}/${id}`;

    navigator.clipboard.writeText(url);

    toastShow();
  }

  return (
    <>
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

      <Toast />
    </>
  );
}

ShareButton.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
