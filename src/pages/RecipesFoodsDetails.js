import React from 'react';
import { getMealByID } from '../services/api';

export default function RecipesFoodsDetails(props) {
  const { match: { params: { id } } } = props;
  return (
    <div>
      <h1>Detalhes das receitas de comida</h1>
      {console.log(getMealByID(id))}
    </div>
  );
}
