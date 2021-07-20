import React, { useEffect, useState } from 'react';
import { getIngredients } from '../services/api';
import IngredientCard from '../components/IngredientCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreIngredientsDrinks() {
  const maxObjRetrieve = 12;
  const [ingredients, setIngredients] = useState();
  useEffect(() => {
    async function fetchIngredients() {
      const { drinks } = await getIngredients('drinks');
      setIngredients(drinks.slice(0, maxObjRetrieve));
      console.log(drinks)
    }
    fetchIngredients();
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes">
        <div />
      </Header>
      { ingredients && ingredients.map(({strIngredient1}, index) => (
        <IngredientCard
          key={ index }  
          index={ index }
          name={ strIngredient1 }
          thumbnail={`https://www.thecocktaildb.com/images/ingredients/${strIngredient1}.png`}
        />
      )) }
      <Footer />
    </div>
  );
}
