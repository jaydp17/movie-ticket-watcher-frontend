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
  'BOGGgGGFu6Vtq_w_2JRqFak_3-JjtdG02lco32frBCMjat7Vg-SkGjJz5EeM3KMTxE5lC9HzYOxEu_3o4zC6xYs';

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
