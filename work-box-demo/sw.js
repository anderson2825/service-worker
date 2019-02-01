console.log('hello from sw.js');
// workbox 2.x 是将 workbox 核心内容放在 workbox-sw node_modules 包里维护的
// workbox 3.x 开始是将 workbox 核心 lib 放在 CDN 维护
// 当然也可以挪到自己的 CDN 维护
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! workbox is loaded 🎉`);
}
else {
    console.log(`Boo! workbox didn't load 😬`);
}