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
