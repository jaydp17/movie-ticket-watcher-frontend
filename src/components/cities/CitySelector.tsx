import React, { useState } from 'react';
import SearchableDropdown from '../SearchableDropdown';
import useCities from './useCities';

interface Props {
  selectCity: (cityID: string) => void;
}
function CitySelector({ selectCity }: Props) {
  const [cities, isLoading] = useCities();
  const [cityID, setCityID] = useState('BANG');

  if (isLoading) return <p>loading...</p>;

  const onCityChange = (selectedID: string | null) => {
    if (!selectedID) return;
    setCityID(selectedID);
    selectCity(selectedID);
  };

  return (
    <SearchableDropdown
      label="City"
      initialSelectedItem={{ id: 'BANG', name: 'Bengaluru', isTopCity: true }}
      items={cities}
      itemToString={city => (city ? city.name : '')}
      onChange={onCityChange}
      getFilterFn={inputValue => {
        const lowerInputValue = (inputValue || '').toLowerCase();
        return city => {
          if (lowerInputValue) city.name.toLowerCase().includes(lowerInputValue);
          return city.isTopCity;
        };
      }}
    />
  );
}

export default CitySelector;
