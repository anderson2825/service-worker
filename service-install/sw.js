var version='v1';
self.addEventListener('install',function(event) {
	event.waitUntil(
		caches.open(version).then(function(cache){
	   return cache.addAll([
				'./service-install/',
				'./service-install/en/image/ban1.jpg',
				'./service-install/en/image/ban2.jpg',
				'./service-install/en/image/ban3.jpg',
				'./service-install/en/script/main.js',
				'./service-install/en/style/main.css'
			]);
		})
	)
});

// 缓存更新
self.addEventListener('activate', function(event) {
  event.waitUntil(
  caches.keys().then(function(cacheNames) {
      console.log("activate");
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== version) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response !== undefined){
        return response;
      }else{
        return fetch(event.request).then(function(response){
          var responseClone = response.clone();
          caches.open(version).then(function(cache){
            cache.put(event.request,responseClone);
          })
          return response;
        }).catch(function(){
          return caches.match('en/image/ban3.jpg');
        })
      }
    })
  );
});