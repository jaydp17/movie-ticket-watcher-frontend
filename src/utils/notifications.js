import { urlBase64ToUint8Array } from './helpers';

export function areNotificationsDisabled() {
  return Notification.permission === 'denied';
}

/**
 * @returns {Promise<{granted: boolean}>}
 */
export function requestPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission(notificationResult => {
      let granted = false;
      if (notificationResult === 'granted') granted = true;
      resolve({ granted });
    });
  });
}

const vapidPublicKey =
  'BCsVNqXbivH1MD3Sa2rRWqTyr-cmPG0cHfWni9cpY5lwDaVH41e5Om01yf9fsQVXVq8Y4Xe2nvwmDB6CWJsI8vY';

/**
 * @returns {Promise<PushSubscription>}
 */
export async function getPushSubscription() {
  return navigator.serviceWorker.ready.then(async registration => {
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
    return subscription;
  });
}
