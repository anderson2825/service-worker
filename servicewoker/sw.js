this.addEventListener('intall',function (event) {
	event.waitUntil(
		caches.open('v1').then(function (cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/style.css',
				'/worker.js'		
			])
	 	})		
	)
});

this.addEventListener('fetch',function (event) {
	event.respondWith(
		caches.match(event.request).then(function () {
			return fetch(event.request).then(function (response) {
				return caches.open('v1').then(function (cache) {
					cache.put(event.request,response.clone());
					return response;
				});
		 	});
		})	
	)
})