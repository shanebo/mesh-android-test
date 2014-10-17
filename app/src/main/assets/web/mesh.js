var mesh, device;


(function(){

// Mesh
// Native calls methods that lead with an underscore

mesh = {

	callbacks: {},
	events: {},

	_initialize: function(info){
		device = info;
		document.dispatchEvent(mesh.events.ready);
	},

	_fire: function(type, args){
		document.dispatchEvent(mesh.events[type]).apply(this, args);
	},

	_callback: function(id, args){
		mesh.callbacks[id].apply(this, args);
		delete mesh.callbacks[id];
	},

	talk: function(url){
		var iframe = document.createElement('IFRAME');
		iframe.setAttribute('src', url);
		document.body.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;
	},

	fire: function(/*route, args, callback*/){
		var args = arguments;
		var id = new Date().getTime();
		var type = typeof args[1];
		var callback, data;

		if (!android) {
			var url = 'mesh://' + args[0].replace(/\./g, '/');
			var params = '?';

			if (type !== 'undefined' && type !== 'function') {
				data = type == 'object' ? args[1] : [args[1]];
				params += serialize(data) + '&';
				callback = args[2];

			} else if (args.length == 2) {
				callback = args[1];
			}

			mesh.callbacks[id] = callback || function(){};
			mesh.talk(url + params + 'callback=' + id);

		} else {
			if (type !== 'undefined' && type !== 'function') {
				data = type == 'object' ? args[1] : [args[1]];
				callback = args[2];

			} else if (args.length == 2) {
				callback = args[1];
			}

			mesh.callbacks[id] = callback || function(){};
			android.fire(args[0], data, id);
		}
	}

};


// Create custom mesh app events for the DOM

['ready', 'resume', 'pause', 'online', 'offline'].forEach(function(name){
	mesh.events[name] = new CustomEvent(name, {
		detail: {
			type: name
		},
		bubbles: true,
		cancelable: false
	});
});


// Maps console methods to log in Xcode

var methods = [
	'assert', 'count', 'dir', 'error',
	'exception', 'group', 'groupCollapsed', 'groupEnd',
	'info', 'log', 'profile', 'profileEnd',
	'time', 'timeEnd', 'trace', 'warn'
];

var length = methods.length;

while (length--) {
	var method = methods[length];
	console[method] = function(log){
		if (typeof log == 'object') log = JSON.stringify(log);
		mesh.talk('console://' + log);
	}
}


// Utils

var serialize = function(obj, prefix){
	var parts = [];
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
			parts.push(typeof v == 'object' ? serialize(v, k) : k + '=' + v);
		}
	}
	return parts.join('&');
}


}());