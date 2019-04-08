var cache_version = 1;
var current_caches = {
  prefetch:'prefetch-cache-v' + cache_version;
}

self.addEventListener('install',function(event) {
  var  urlsTocache = ['','en/image/ban1.jpg','en/image/ban2.jpg','en/image/ban3.jpg'];
  event.waitUntil(
    caches.open(current_caches['prefetch']).then(function(cache) {
      cache.addAll(urlsTocache.map(function(urlsTocache){
        return new Request(urlsTocache,{mode:'no-cors'});
      })).then(function(){
        console.log('All resources have been fetched and cached.');
      })
    }).catch(function(error){
      console.error('prefetch failed',error);
    })
  )
})

self.addEventListener('fetch',function(event) {
  event.respondWith(
    cache.match(event.request).then(function(response) {
      if(response){
        return response;
         console.log(response);
      }
      return fetch(event.request).then(function(response){
        if(!response || response.status !=200 || response.type!== 'basic'){
          return response;
          console.log(response);
        }
        var responseToCache = response.clone();
        caches.open(precache).then(function(cache){
          cache.put(event.request,responseToCache);
        })
        return response;
      })
    })
  )
})

self.addEventListener('activate',function(event){
  var cacheWhiteList = ['precache-v1','precache-v2'];
  event.waitUntil(
    caches.keys().then(function(cacheNames){
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