var  precache = 'precache-v1';
var  urlsTocache = ['','style/main.css','script/main.js'];
self.addEventListener('install',function(event) { 
	event.waitUntil(
		caches.open(precache).then(function(cache) {
			console.log('opened cache');
			return cache.addAll(urlsTocache);
		})
	)
})
