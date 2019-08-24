import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState } from 'react';
import styled from 'styled-components';
import { toYYYY_MM_DD } from '../../helpers/date-helpers';
import CinemaSelector from '../Cinemas';
import CitySelector from '../Cities';
import DatePicker from '../DatePicker';
import MovieSelector from '../Movies';
import { FormStatus } from './types';
import useSubscribe from './useSubscribe';

const Form = styled.form`
  display: flex;
  flex-direction: column;

  > div {
    margin-top: 12px;
    margin-bottom: 12px;
    width: 100%;
  }

  > button {
    margin-top: 24px;
    width: 100%;
  }
`;

const SubscribeButton = styled(Button)`
  max-width: 300px;
  align-self: center;
  && {
    background-color: ${(props: { formStatus: FormStatus }) =>
      props.formStatus === FormStatus.success ? '#4caf50' : null};
  }
`;

const ProgressBar = styled(CircularProgress)`
  margin-left: 24px;
`;

function SubscriptionForm() {
  const [cityID, setCityID] = useState('BANG');
  const [movieID, setMovieID] = useState();
  const [cinemaID, setCinemaID] = useState();
  const [date, setDate] = useState(() => toYYYY_MM_DD(new Date()));

  const [formStatus, onSubmitCallback] = useSubscribe({ cityID, movieID, cinemaID, date });
  return (
    <Form onSubmit={onSubmitCallback}>
      <CitySelector selectCity={setCityID} />
      <MovieSelector cityID={cityID} selectMovie={setMovieID} />
      <CinemaSelector cityID={cityID} selectCinema={setCinemaID} />
      <DatePicker selectDate={setDate} />
      <SubscribeButton
        variant="contained"
        color="secondary"
        type="submit"
        size="large"
        formStatus={formStatus}
        disabled={formStatus === FormStatus.submitting}
      >
        {formStatus === FormStatus.success ? 'Subscribed' : 'Subscribe'}
        {formStatus === FormStatus.submitting && <ProgressBar size={24} />}
      </SubscribeButton>
    </Form>
  );
}

export default SubscriptionForm;
