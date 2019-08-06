import React, { useState } from 'react';
import CinemaSelector from '../Cinemas';
import CitySelector from '../Cities';
import MovieSelector from '../Movies';

function SubscriptionForm() {
  const [cityID, setCityID] = useState('BANG');
  const [movieID, setMovieID] = useState();
  const [cinemaID, setCinemaID] = useState();
  return (
    <form>
      <CitySelector selectCity={setCityID} />
      <MovieSelector cityID={cityID} selectMovie={setMovieID} />
      <CinemaSelector cityID={cityID} selectCinema={setCinemaID} />
    </form>
  );
}

export default SubscriptionForm;
