self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/service-demo/',
        '/service-demo/index.html',
        '/service-demo/style.css',
        '/service-demo/app.js',
        '/service-demo/image-list.js',
        '/service-demo/images_pro.jpg',
        '/service-demo/images/a1.jpg',
        '/service-demo/images/a2.jpg',
        '/service-demo/images/a3.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/service-demo/images/a3.jpg');
      });
    }
  }));
});
