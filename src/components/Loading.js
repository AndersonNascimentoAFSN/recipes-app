// https://loading.io/css/
import React from 'react';
import './loading.css';

export default function Loading() {
  return (
    <div className="loader__container">
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
