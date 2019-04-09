importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

 
workbox.precaching.precacheAndRoute([
	'js/index.js',
	'css/index.css',
	{url:'index.html?key2=2',revision:'258541'},
 ],{
	ignoreURLParametersMatching:[/.*/]   //删除.html文件后缀
});



 

