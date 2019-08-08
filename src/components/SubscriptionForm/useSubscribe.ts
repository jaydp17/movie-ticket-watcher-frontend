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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(FormStatus.submitting);
    console.log({ cityID, movieID, cinemaID, date });
    if (!cityID || !movieID || !cinemaID || !date) {
      alert('fill the damn form!');
      setFormStatus(FormStatus.idle);
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Allow notification permission to subscribe!');
      setFormStatus(FormStatus.idle);
      return;
    }

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
