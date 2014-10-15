

var handler = function(e){
	if (e.type == 'ready') {
		console.log(device);

		var cb = function(uno, dos, tres){
			console.log('dummy callback fired');
			console.log([uno, dos, tres]);
		}

		mesh.fire('only.route');
		mesh.fire('args.nonobjectwithnocallback', true);
		mesh.fire('args.nocallback', ['whats', 'up', 'yo']);
		mesh.fire('noargs.withcallback', cb);
		mesh.fire('args.nonobjectwithcallback', true, cb);
		mesh.fire('args.withcallback', ['nicely', 'done', 'man'], cb);
	}

	document.getElementById('event').innerHTML = e.type + ' event fired!';
}


document.addEventListener('ready', handler);


// setting up handlers for core mesh events
var app_events = ['resume', 'pause', 'online', 'offline'];

app_events.forEach(function(name){
	document.addEventListener(name, handler);
});

/*
app_events.forEach(function(name, i){
	setTimeout(function(){
		mesh._fire(name);
	}, 1000 * (i + 1));
});
*/