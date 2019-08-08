import React, { useState } from 'react';
import { toYYYY_MM_DD } from '../../helpers/date-helpers';
import CinemaSelector from '../Cinemas';
import CitySelector from '../Cities';
import DatePicker from '../DatePicker';
import MovieSelector from '../Movies';
import { FormStatus } from './types';
import useSubscribe from './useSubscribe';

function SubscriptionForm() {
  const [cityID, setCityID] = useState('BANG');
  const [movieID, setMovieID] = useState();
  const [cinemaID, setCinemaID] = useState();
  const [date, setDate] = useState(() => toYYYY_MM_DD(new Date()));

  const [formStatus, onSubmitCallback] = useSubscribe({ cityID, movieID, cinemaID, date });
  return (
    <form onSubmit={onSubmitCallback}>
      <CitySelector selectCity={setCityID} />
      <MovieSelector cityID={cityID} selectMovie={setMovieID} />
      <CinemaSelector cityID={cityID} selectCinema={setCinemaID} />
      <DatePicker selectDate={setDate} />
      <input type="submit" value="Subscribe" disabled={formStatus === FormStatus.submitting} />
    </form>
  );
}

export default SubscriptionForm;
