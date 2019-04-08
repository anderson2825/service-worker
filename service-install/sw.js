var cache_version = 5;
var current_caches = {
  prefetch:'prefetch-cache-v' + cache_version
}

self.addEventListener('install',function(event) {
  var  urlsTocache = ['','en/image/ban1.jpg','en/image/ban2.jpg','en/image/ban3.jpg'];
  event.waitUntil(
    caches.open(current_caches['prefetch']).then(function(cache) {
      cache.addAll(urlsTocache.map(function(urlsTocache){
        return new Request(urlsTocache);
      })).then(function(){
        console.log('All resources have been fetched and cached.');
      })
    }).catch(function(error){
      console.error('prefetch failed',error);
    })
  )
})

self.addEventListener('activate',function(event){
  var expecatedCacheNames = Object.keys(current_caches).map(function(key){
    return current_caches[key];
  })
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(expecatedCacheNames.indexOf(cacheName == -1)){
            console.log('Deleting out of date cache',cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})
