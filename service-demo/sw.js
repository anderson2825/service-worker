if('serviceWorker' in navigator){
	window.addEventListener('load',function() {
		navigator.serviceWorker.register('sw.js',{scope:''})
		.then(function(registration){

			//注册成功
			console.log('serviceWorker registration successful with scope:',registration.scope);
		})
		.catch(function(err){
			//注册失败
			console.log('serviceWorke registration successful with scope:',err);
		});
	});
	this.addEventListener('install',function (event){
		event.waitUntil(
			caches.open('my-test-cache-v1').then(function (cache){
				return cache.addAll([
					'/',
					'/index.html',
	                '/main.css',
	                '/main.js',
	                '/images.jpg'
				])
			})		
		)
	});
	this.addEventListener('fetch',function (event) {
		event.respondWith(
			caches.match(event.request).then(function (response){
				if(response) {
					return response;
				}

				var request = event.request.clone();
 				return fetch(request).then(function (httpRes){
 					if(!httpRes || httpRes.status !== 200){
 						return httpRes;
 					}

 					var responseClone = httpRes.clone();
 					caches.open('my-test-cache-v1').then(function (cache) {
 						cache.put(event.request,responseClone);
 					});

 					return httpRes;
				})		
			})
		)	
	})
}