if('serviceWorker' in navigator){
	navigator.serviceWorker.register('sw.js').then(function (reg) {
		console.log('registration successed.scope is'+ reg);
	}).catch(function (error) {
		console.log('Registration failed with' + error);
	})
}