var cache_version = 2;
var current_caches = {
	font: 'font-cache-v' + cache_version
};
/*新建缓存对象font*/
self.addEventListener('activate',function(event){
	var expecatedCacheNames = Object.keys(current_caches).map(function(key){     /*储存缓存遍历匹配每个缓存*/
		return current_caches[key];
	})
     
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(expecatedCacheNames.indexOf(cacheName)== -1){    /*匹配缓存名称，相同的就删除*/
						console.log('Deleting out of date cache',cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})


self.addEventListener('fetch',function (event) {
	console.log('handling fetch event for',event.request.url);
	event.respondWith(
		caches.open(current_caches['font']).then(function(cache){
			return cache.match(event.request).then(function(response){
				if(response){
					console.log('found response in cache:',response);
					return response;
				}
 			}).catch(function(err){
				console.error('error in fetch handler:',err);
				throw err;
			})
		})
 	)
})