import { urlBase64ToUint8Array } from './helpers';

export function areNotificationsDisabled() {
  return Notification.permission === 'denied';
}

export async function getPushSubscription() {
  const registration = await navigator.serviceWorker.register('/sw.js');
  console.log('ServiceWorker registration successful with scope: ', registration.scope);
  const vapidPublicKey =
    'BCsVNqXbivH1MD3Sa2rRWqTyr-cmPG0cHfWni9cpY5lwDaVH41e5Om01yf9fsQVXVq8Y4Xe2nvwmDB6CWJsI8vY';
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  });
  console.log(JSON.stringify(subscription));
  return subscription;
}
