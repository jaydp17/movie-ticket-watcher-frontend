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

    const workerReg = await navigator.serviceWorker.getRegistration();
    if (!workerReg) {
      alert('worker registration not found!');
      return;
    }
    const subscription = await getSubscription(workerReg);

    fetch(`${serverBaseURL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cityID,
        movieID,
        cinemaID,
        webPushSubscription: JSON.stringify(subscription),
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

async function getSubscription(workerReg: ServiceWorkerRegistration) {
  const existingSubscription = await workerReg.pushManager.getSubscription();
  if (existingSubscription) return existingSubscription;

  const publicKey = process.env.GATSBY_VAPID_PUBLIC_KEY || '';
  if (!publicKey) {
    alert('vapid public key not found');
    return;
  }
  const applicationServerKey = urlB64ToUint8Array(publicKey);
  const options = { applicationServerKey, userVisibleOnly: true };
  const subscription = await workerReg.pushManager.subscribe(options);
  return subscription;
}

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
function urlB64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
