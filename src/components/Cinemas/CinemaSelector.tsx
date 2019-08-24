import React, { useState } from 'react';
import SearchableDropdown from '../SearchableDropdown';
import useCinemas from './useCinemas';

interface Props {
  cityID: string;
  selectCinema: (cinemaID: string) => void;
}
function CinemaSelector({ cityID, selectCinema }: Props) {
  const [cinemas, isLoading] = useCinemas(cityID);
  const [cinemaID, setCinema] = useState();

  const onCinemaChange = (selectedID: string | null) => {
    if (!selectedID) return;
    setCinema(selectedID);
    selectCinema(selectedID);
  };

  return (
    <SearchableDropdown
      isLoading={isLoading}
      label="Cinema"
      items={cinemas}
      itemToString={cinema => (cinema ? cinema.name : '')}
      onChange={onCinemaChange}
      getFilterFn={inputValue => {
        const lowerInputValue = (inputValue || '').toLowerCase();
        return cinema => !lowerInputValue || cinema.name.toLowerCase().includes(lowerInputValue);
      }}
    />
  );
}

export default CinemaSelector;
