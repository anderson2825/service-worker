if('serviceWorker' in navigator){
	window.addEventListener('load',function() {
		navigator.serviceWorker.register('/service-demo/sw.js',{scope:'/service-demo/'})
		.then(function(registration){
 			//注册成功
			console.log('serviceWorker registration successful with scope:',registration.scope);
		})
		.catch(function(err){
			//注册失败
			console.log('serviceWorke registration successful with scope:',err);
		});
	});
}