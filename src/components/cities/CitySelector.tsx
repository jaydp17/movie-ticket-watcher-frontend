import React, { useState } from 'react';
import useCities from './useCities';

function CitySelector() {
  const [cities, isLoading] = useCities();
  const [cityCode, setCityCode] = useState('BANG');

  if (isLoading) return <p>loading...</p>;
  return (
    <fieldset>
      <legend>Cities</legend>
      <select name="city" value={cityCode} onChange={e => setCityCode(e.target.value)}>
        {cities.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default CitySelector;
