var  precache = 'precache-v1';
var  urlsTocache = ['','en/image/ban1.jpg','en/image/ban2.jpg','en/image/ban3.jpg'];
self.addEventListener('install',function(event) { 
  event.waitUntil(
    caches.open(precache).then(function(cache) {
      console.log('opened cache');
      return cache.addAll(urlsTocache);
    })
  )
})

self.addEventListener('fetch',function(event) {
  console.log(event.request.url,cacheStorageKey);
  event.respondWith(
    caches.match(event.request).then(function(response) {

/*      if(response){
        return response;
      }else{
        console.log(response);
        return fetch(event.request).then(function(response){
          if(!response || response.status !=200 || response.type!== 'basic'){
            return response;
          }
          var responseToCache = response.clone();
          caches.open(precache).then(function(cache){
            cache.put(event.request,responseToCache);
          })
          return response;
        })
      }*/
    })
  )
})

self.addEventListener('activate',function(event){
  var cacheWhiteList = ['precache-v1','precache-v2'];
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      console.log(cacheNames);
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheWhiteList.indexOf(cacheName)=== -1){
            return cache.delete(cacheName);
          }
        })
      )
    })
  )
})