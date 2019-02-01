console.log('hello from sw.js');
// workbox 3.x 开始是将 workbox 核心 lib 放在 CDN 维护
// 当然也可以挪到自己的 CDN 维护
if('function' === typeof importScripts){
	importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
}

if (workbox) {
    console.log('Yay! workbox is loaded ');
}
else {
    console.log('Boo! workbox didn\'t load');
}