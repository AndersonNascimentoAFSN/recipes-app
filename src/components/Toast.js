import React from 'react';
import './toast.css';

export default function Toast() {
  return (
    <div className="snackbar">
      <span>Link copiado!</span>
      <div className="toast-progress-bar" />
    </div>
  );
}
