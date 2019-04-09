importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

var matchFun =function (url,event) {
//	return url;
	console.log(url,event);
	return false;
}
 
workbox.core.setCacheNameDetails({
	prefix:'my-app',
	suffix:'v2',
	precache:'install-time',
	runtime:'run-time'
})

workbox.precaching.precacheAndRoute([
	'css/index.css',
	{url:'index.html',revision:'385554'},
])
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
)
