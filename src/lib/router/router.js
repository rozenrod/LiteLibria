const Router = {
	routes: [],
	mode: null,
	root: '/',
	config: function(options) {
			this.mode = options && options.mode && options.mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
			this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
			return this;
	},
	getFragment: function() {
			let fragment = '';
			if(this.mode === 'history') {
					// fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
					fragment = this.clearSlashes(decodeURI(window.location.href.replace('/#', '').replace(window.location.origin, '/')));
					fragment = fragment.replace(/\?(.*)$/, '');
					fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
			} else {
					let match = window.location.href.match(/#(.*)$/);
					fragment = match ? match[1] : '';
			}
			return this.clearSlashes(fragment);
	},
	getParams: function () {
			let query = '';
			if(this.mode === 'history') {
					query = decodeURI(window.location.href.replace('/#', '')).split("?")[1];
			} else {
					let index = window.location.hash.indexOf("?");
					query = (index !== -1) ? window.location.hash.substring(index) : "";
			}
			let _query = {};
			if (typeof query !== "string") {
					return _query;
			}
			if (query[0] === "?") {
					query = query.substring(1);
			}
			query.split("&").forEach(function (row) {
					let parts = row.split("=");
					if (parts[0] !== "") {
							if (parts[1] === undefined) {
									parts[1] = true;
							}
							_query[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
					}
			});
			return _query;
	},
	clearSlashes: function(path) {
			return path.toString().replace(/\/$/, '').replace(/^\//, '');
	},
	add: function(re, handler, options) {
			if(typeof re == 'function') {
					handler = re;
					re = '';
			}
			this.routes.push({ re: re, handler: handler, options: options});
			return this;
	},
	remove: function(param) {
			for(let i=0, r; i < this.routes.length, r = this.routes[i]; i++) {
					if(r.handler === param || r.re.toString() === param.toString()) {
							this.routes.splice(i, 1); 
							return this;
					}
			}
			return this;
	},
	flush: function() {
			this.routes = [];
			this.mode = null;
			this.root = '/';
			return this;
	},
	check: function(f) {
		let fragment = f || this.getFragment();
			for(let i=0; i < this.routes.length; i++) {
					let match = fragment.match(this.routes[i].re);
					if(fragment == '' || fragment == '/') match = 'home'.match(this.routes[i].re);
					if(match) {
							match.shift();
							let query = this.getParams();
							this.routes[i].handler.apply({query}, match);
							return this;
					}
			}
			return this;
	},
	listen: function() {
			let self = this;
			let current = self.getFragment();
			let current_query = self.getParams();
			let fn = function() {
				if(current !== self.getFragment()) {
					current = self.getFragment();
					self.check(current);
				}
				// if(current !== self.getFragment() || JSON.stringify(current_query) !== JSON.stringify(self.getParams())) {
				// 	current = self.getFragment();
				// 	current_query = self.getParams();
				// 	self.check(current);
				// }
			}
			clearInterval(this.interval);
			this.interval = setInterval(fn, 50);
			return this;
	},
	navigate: function(path, mode = true) {
			path = path || '';
			if(mode){
				if(this.mode === 'history') {
					history.replaceState({position: window.pageYOffset}, null);
					history.pushState({position: 0}, null, this.root + this.clearSlashes(path));
				} else {
					window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
				}
			}
			return this;
	},
	update: function(key, value) {
		let url = window.location;
		let URLParams = new URLSearchParams(url.search);
		let RouterParams = Router.getParams();

		value = value.replace(' ', '+');

		if(RouterParams[key]){
			let objParams = RouterParams[key].split(',');

			if(Object.values(objParams).includes(value)) objParams.splice(objParams.indexOf(value), 1);
			else objParams.push(value);

			makeUniq = (arr) => [...new Set(arr)];

			objParams = makeUniq(objParams);
	
			if(objParams.length == 0) URLParams.delete(key);
			else URLParams.set(key, objParams);

		} else {
			URLParams.set(key, value);
		}
		
		history.replaceState({position: window.pageYOffset}, null, window.location.origin + window.location.pathname + '?' + URLParams.toString());
	}
}

/**
 * Add event listeners
*/
window.addEventListener('click', function (event) {
	if (!event.target.matches('[data-route]')) return;
	event.preventDefault();
	Router.navigate((event.target.href).replace(window.location.origin, ''));
}, false);

if(Router.mode === 'history'){
	window.addEventListener('popstate', function (event) {
		if (!history.state.url) return;
		Router.navigate(history.state.url);
	}, false);
}