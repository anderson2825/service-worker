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

 


 

workbox.precaching.precacheAndRoute([
	'js/index.js',
	'css/index.css',
	{url:'index.html',revision:'385554'},
],{
	ignoreURLParmetersMatching:[/.*/]
});

 

