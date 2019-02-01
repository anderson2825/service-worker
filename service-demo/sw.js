	this.addEventListener('install',function (event){
		event.waitUntil(
			caches.open('my-test-cache-v1').then(function (cache){
				return cache.addAll([
					'/service-demo/',
					'/service-demo/index.html',
	                '/service-demo/main.css',
	                '/service-demo/main.js',
	                '/service-demo/images.jpg'
				]);
			})		
		);
	});
	this.addEventListener('fetch',function (event) {
		event.respondWith(
			caches.match(event.request).then(function (response){
				if(response !== undefined) {
					return response;
				}else{
					return fetch(event.request).then(function (response){
	 				 	var responseClone = response.clone();
	 					caches.open('my-test-cache-v1').then(function (cache) {
	 						cache.put(event.request,responseClone);
	 					});
 						return response;
					}); 	
 				}
 			});
		)	
	});