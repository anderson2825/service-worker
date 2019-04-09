importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({
	prefix:'my-app',
	suffix:'v1',
	precache:'install-time',
	runtime:'run-time',
	googleAnalytics:'ga'
})

workbox.precaching.precacheAndRoute([
	'css/index.css',
	{url:'index.html',revision:'385554'},
])
workbox.routing.registerRoute(
	new RegExp('.*\.js'),
	new workbox.strategies.NetworkFirst()
)
