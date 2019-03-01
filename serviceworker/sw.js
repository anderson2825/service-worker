console.log("hello form sw.js");
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! workbox is loaded 🎉`);
}
else {
    console.log(`Boo! workbox didn't load 😬`);
}

workbox.precaching.preacheAndRoute([
    '/serviceworker/style/test.css',
    '/serviceworker/script/test.js',
    {
        url:'/serviceworker/index.html',
        revision: '383676'
    },
]);