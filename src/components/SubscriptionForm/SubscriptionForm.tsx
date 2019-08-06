import React, { useState } from 'react';
import CitySelector from '../Cities';
import MovieSelector from '../Movies';

function SubscriptionForm() {
  const [cityID, setCityID] = useState('BANG');
  const [movieID, setMovieID] = useState();
  return (
    <form>
      <CitySelector selectCity={setCityID} />
      <MovieSelector cityID={cityID} selectMovie={setMovieID} />
    </form>
  );
}

export default SubscriptionForm;
