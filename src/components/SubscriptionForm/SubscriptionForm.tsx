import React, { useState } from 'react';
import CinemaSelector from '../Cinemas';
import CitySelector from '../Cities';
import MovieSelector from '../Movies';
import DatePicker from '../DatePicker';
import { toYYYY_MM_DD } from '../../helpers/date-helpers';

function SubscriptionForm() {
  const [cityID, setCityID] = useState('BANG');
  const [movieID, setMovieID] = useState();
  const [cinemaID, setCinemaID] = useState();
  const [date, setDate] = useState(() => toYYYY_MM_DD(new Date()));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ cityID, movieID, cinemaID, date });
  };

  return (
    <form onSubmit={onSubmit}>
      <CitySelector selectCity={setCityID} />
      <MovieSelector cityID={cityID} selectMovie={setMovieID} />
      <CinemaSelector cityID={cityID} selectCinema={setCinemaID} />
      <DatePicker selectDate={setDate} />
      <input type="submit" value="Subscribe" />
    </form>
  );
}

export default SubscriptionForm;
