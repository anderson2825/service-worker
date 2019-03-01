console.log("hello form sw.js");
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! workbox is loaded 🎉`);
}
else {
    console.log(`Boo! workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  new workbox.strategies.NetworkFirst()
);

/*workbox.precaching.preacheAndRoute([
    '/style/test.css',
   	{
        url:'/index.html',
        revision: '383676',
    },
]);*/