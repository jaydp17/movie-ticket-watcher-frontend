import React, { useState } from 'react';
import useCinemas from './useCinemas';

interface Props {
  cityID: string;
  selectCinema: (cinemaID: string) => void;
}
function CinemaSelector({ cityID, selectCinema }: Props) {
  const [cinemas, isLoading] = useCinemas(cityID);
  const [cinemaID, setCinema] = useState();

  const onCinemaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedID = e.target.value;
    if (!selectedID) return;
    setCinema(selectedID);
    selectCinema(selectedID);
  };

  return (
    <fieldset>
      <legend>Cinemas</legend>
      {isLoading && <p>loading...</p>}
      {!isLoading && (
        <select name="cinemaID" value={cinemaID} onChange={onCinemaChange}>
          <option hidden>Select a Cinema</option>
          {cinemas.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      )}
    </fieldset>
  );
}

export default CinemaSelector;
