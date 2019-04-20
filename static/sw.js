console.log('hello.js 1');

self.addEventListener('push', e => {
  console.log('push event', e);
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body || 'hello',
    icon: data.icon,
  });
});
