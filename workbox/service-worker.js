	console.log('hello from service-worker.js');
	importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');
	if (workbox) {
	  console.log(`Yay! Workbox is loaded 🎉`);
	} else {
	  console.log(`Boo! Workbox didn't load 😬`);
	}

	workbox.routing.registerRoute(
		new RegExp('.*\.js'),
		new workbox.strategies.NetworkFirst()
	)
 