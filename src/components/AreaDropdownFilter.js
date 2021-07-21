import React, { useEffect, useState } from 'react';

function DropdownFilter({ selectedArea, areaSetter }) {
  const [ areaData, setAreaData ] = useState([]);

  useEffect(() => {
    async function fetchAreaData() {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const { meals } = await ((await fetch(url)).json().then((data) => data));
      setAreaData(meals);
    }
    fetchAreaData();
  }, []);

  return (
    <select
      data-testid="explore-by-area-dropdown"
      value={ selectedArea }
      onChange={ (e) => areaSetter(e.target.value) }
    >
      { areaData && areaData.map(({strArea}, index) => (
        <option
          key={ index }
          value={ strArea }
          data-testid={ `${strArea}-option` }
        >
          { strArea }
        </option>
      ))}
      <option
        value=""
        data-testid="All-option"
      >
        All
      </option>
    </select>
  );
}

export default DropdownFilter;