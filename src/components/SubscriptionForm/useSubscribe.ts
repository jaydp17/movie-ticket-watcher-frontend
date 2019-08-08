import { useState } from 'react';
import { serverBaseURL } from '../../config';
import { FormStatus } from './types';

interface Props {
  cityID: string;
  movieID: string;
  cinemaID: string;
  date: string;
}
export default function useSubscribe({
  cityID,
  movieID,
  cinemaID,
  date,
}: Props): [FormStatus, (e: React.FormEvent<HTMLFormElement>) => void] {
  const [formStatus, setFormStatus] = useState(FormStatus.idle);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ cityID, movieID, cinemaID, date });
    if (!cityID || !movieID || !cinemaID || !date) {
      alert('fill the damn form!');
      return;
    }
    setFormStatus(FormStatus.submitting);
    fetch(`${serverBaseURL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cityID,
        movieID,
        cinemaID,
        webPushSubscription: 'hello',
        screeningDate: date,
      }),
    })
      .then(res => res.json())
      .then(body => {
        setFormStatus(FormStatus.success);
        console.log('response body', body);
      })
      .catch(err => {
        setFormStatus(FormStatus.fail);
        console.log('response error', err);
      });
  };

  return [formStatus, onSubmit];
}
