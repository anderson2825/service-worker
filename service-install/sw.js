var version='v1';
self.addEventListener('install',function(event) {
	event.waitUntil(
		caches.open('version').then(function(cache){
			cache.addAll([
				'/en/',
				'/en/image/ban1.jpg',
				'/en/image/ban2.jpg',
				'/en/image/ban3.jpg',
				'/en/script/main.js',
				'/en/style/main.css'
			]);

			return cache.addAll([
				'/en/',
				'/en/image/ban1.jpg',
				'/en/image/ban2.jpg',
				'/en/image/ban3.jpg',
				'/en/script/main.js',
				'/en/style/main.css'
			]);
		})
	)
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('version').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});