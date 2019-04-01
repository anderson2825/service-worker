window.addEventListener('load',function() {
	const sw = window.navigator.serviceWorker
	const killSw = window.killSw || false
	if(!sw){
		return 
	}

	if(!!killSw){
		sw.getRegistration('/serviceWorker').then(registration=>{
			//手动注销
			registration.unregister();
			//清除缓存
			window.caches && caches.key && caches.keys().then(function(keys){
				keys.forEach(function(key){
					caches.delete(key);
				})
			})
		})
	}else{
		//表示该sw 监听的是根域名下的请求

		sw.register('/serviceWorker.js',{scope:'/'}).then(registration=>{
			console.log('Registered events at scope:',registration.scope);
		}).catch(err=>{
			console.log(err);
		})
	}


})