export function areNotificationsDisabled() {
  return Notification.permission === 'denied';
}
