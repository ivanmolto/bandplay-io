const CACHE_NAME = `Bandplay_cache_${1598888834953}`;
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin !== location.origin || request.method.toLowerCase() !== 'get') {
    return;
  }
  event.respondWith(
    caches
      .open(CACHE_NAME)
      .then(async cache => {
        try {
          const response = await fetch(event.request);
          cache.put(event.request, response.clone());
          return response;
        } catch(err) {
          const response = await cache.match(event.request);
          if (response) return response;
          throw err;
        }
      })
    );
});
