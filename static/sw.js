self.addEventListener('push', e => {
  console.log('push event', e);
  const data = e.data.json();
  console.log('push data', data);
  self.registration.showNotification(data.title, {
    body: data.body || 'hello',
    icon: data.icon,
    vibrate: data.vibrate,
    actions: data.actions,
  });
});

self.addEventListener('notificationclick', event => {
  console.log('closing notification');
  const clickedNotification = event.notification;
  clickedNotification.close();
  console.log('closed');
});
