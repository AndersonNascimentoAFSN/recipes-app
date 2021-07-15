import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Toast from './Toast';
import './shareButton.css';

export default function ShareButton({ index, id, type }) {
  const history = useLocation();
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
      .split(history.pathname)[0]}/${type}/${id}`;

    navigator.clipboard.writeText(url);

    toastShow();
  }

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onClickClipboard }
        className="shareButton__button"
      >
        <img
          src={ shareIcon }
          alt="share recipes"
          data-testid={ `${index}-horizontal-share-btn` }
          className="shareButton__img"
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
