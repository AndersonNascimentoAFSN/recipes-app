import React, { useEffect, useState } from 'react';
import { getMealByID } from '../services/api';

export default function RecipesFoodsDetails(props) {
  const { match: { params: { id } } } = props;
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    const getMeal = async () => {
      const results = await getMealByID(id);
      setMeal(results);
    };

    getMeal();
  }, [id, setMeal]);

  return (
    <div>
      <h1>Detalhes das receitas de comida</h1>
      <img
        src={ meal.strMealThumb }
        alt=""
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{ meal.strMeal }</p>
      <p data-testid="recipe-category">{ meal.strCategory }</p>
    </div>
  );
}
