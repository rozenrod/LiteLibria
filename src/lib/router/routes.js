Router
	.add('search', function () {
		menuPageActive('search');
		Search.init(this.query);
		routerScroll()
	})
	.add('release/(.*)', function (id) {
		menuPageActive('');
		Release.init(id);
		routerScroll()
	})
	.add('release', function () {
		menuPageActive('');
		Release.init(this.query.id);
		routerScroll()
	})
	.add('catalog', function () {
		menuPageActive('catalog');
		Catalog.init();
		routerScroll()
	})
	.add('favorites', function () {
		menuPageActive('favorites');
		Favorites.init();
		routerScroll()
	})
	.add('options', function () {
		menuPageActive('options');
		Option.init();
		routerScroll()
	})
	.add('history', function () {
		menuPageActive('');
		History.init();
		routerScroll()
	})
	.add('schedule/(.*)', function (day) {
		menuPageActive('');
		Schedule.init(day);
		routerScroll()
	})
	.add('schedule', function () {
		menuPageActive('');
		Schedule.init();
		routerScroll()
	})
	.add('home', function () {
		menuPageActive('home');
		Home.init();
		routerScroll()
	})
	.add('notes', function () {
		menuPageActive('');
		Notes.init();
		routerScroll()
	})
	.add(function () {
		menuPageActive('');
		page_404();
		routerScroll()
	})


function routerScroll(){
	if (!history.state) return;
	window.scroll(0, history.state.position);
}