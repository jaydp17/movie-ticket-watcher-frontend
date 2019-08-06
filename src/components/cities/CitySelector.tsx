import React, { useState } from 'react';
import useCities from './useCities';

interface Props {
  selectCity: (cityID: string) => void;
}
function CitySelector({ selectCity }: Props) {
  const [cities, isLoading] = useCities();
  const [cityID, setCityID] = useState('BANG');

  if (isLoading) return <p>loading...</p>;

  const onCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedID = e.target.value;
    if (!selectedID) return;
    setCityID(selectedID);
    selectCity(selectedID);
  };

  return (
    <fieldset>
      <legend>Cities</legend>
      <select name="cityID" value={cityID} onChange={onCityChange}>
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
