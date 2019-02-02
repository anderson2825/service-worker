self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/serivce-demo/',
        '/serivce-demo/index.html',
        '/serivce-demo/style.css',
        '/serivce-demo/app.js',
        '/serivce-demo/image-list.js',
        '/serivce-demo/images_pro.jpg',
        '/serivce-demo/images/a1.jpg',
        '/serivce-demo/images/a2.jpg',
        '/serivce-demo/images/a3.jpg'
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