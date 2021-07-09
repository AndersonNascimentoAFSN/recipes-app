import React from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ index, id, type }) {
  const notify = () => toast.success('Link copiado!', {
    style: {
      border: '1px solid #713200',
      padding: '16px',
      color: '#713200',
    },
    iconTheme: {
      primary: '#713200',
      secondary: '#FFFAEE',
    },
  });

  function onClickClipboard() {
    const url = `${window.location.href
      .split('/receitas-feitas')[0]}/${type}/${id}`;

    navigator.clipboard.writeText(url);

    notify();
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
      <Toaster
        position="top-center"
        reverseOrder={ false }
      />
    </>
  );
}

ShareButton.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
