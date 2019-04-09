importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

/*self.addEventListener('install',function(event){
	self.skipWaiting();
})

self.addEventListener('activate',function(event){
	clients.claim();
})*/

var matchFun =function (url,event) {
	console.log(url,event);
	return (url.pathname === '/service-worker/workbox2/js/index.js');
}


workbox.core.setCacheNameDetails({
	prefix:'my-app',
	suffix:'v89',
	precache:'install-time',
	runtime:'run-time'
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
	'css/index.css',
	{url:'index.html',revision:'385554'},
]);

workbox.routing.registerRoute(
	matchFun,
	/*new RegExp('.*\.js'),*/
	new workbox.strategies.NetworkFirst({
		cacheName:'my-js-cache',
	})
);

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	new workbox.strategies.CacheFirst({
		cacheName:'my-images-cache',
		plugins:[
			new workbox.expiration.Plugin({
				maxEntries:60,
				maxAgeSeconds:30*24*60*60,
			})
		],
	}),
);

