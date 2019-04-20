console.log('hello.js 1');
 
self.addEventListener('push', e => {
  console.log('push event', e);
})