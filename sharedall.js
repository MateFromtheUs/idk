self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.open('offline-cache').then(function(cache) {
        return cache.match('offline.html');
      });
    })
  );
});