 if('serviceWorker' in navigator){
 	window.addEventListener('load' ,function () {
 		const prefix = location.pathname.replace(/\/(index\.html)?$/,'');
 		navigator.serviceWorker.register('${prefix}/sw.js')
 		.then(function (registration) {
 			console.log('[success] scope',registration.scope);
 		},function (err) {
 			console.log('[fail]:',err);
 		})
 	})
}

console.log('index.js modified');