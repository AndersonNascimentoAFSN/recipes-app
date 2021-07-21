import React from 'react';
import notFound from '../images/notFound.png';

import './notFound.css';

function NotFound() {
  return (
    <div className="notFound_page">
      <img
        src={ notFound }
        alt="Not found"
      />
      <p>Not Found</p>
    </div>
  );
}

export default NotFound;