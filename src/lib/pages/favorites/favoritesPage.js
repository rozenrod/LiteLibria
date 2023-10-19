const Favorites = {
	list: [],
	init: async function() {
		// let html = await fetch('/lib/pages/favorites/index.html').then((response) => response.text());
		let html = `<div class="SortingBlock" id="SortingBlock" style="display:none"><div class="SortingBlockForm"><span class="SortingContainer"><select class="SortingChosen" id="SortingOrderBy"><option value="" selected="selected">Сортировать по ...</option><option value="season.year">Году</option><option value="code">Названию</option><option value="in_favorites">Популярности</option><option value="type.episodes">Количеству серий</option><option value="season.code">Типу</option></select><label class="SortingCheckboxContainer"><input type="checkbox" checked="checked" id="SortingChecUpTop"><span class="SortingCheckmark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"/></svg></span></label></span><button class="SortingButton" id="SortingClear">Сбросить</button></div></div><div class="SortingBlockSelect" id="SortingBlockGenres" style="display:none"></div><div class="SortingBlockSelect" id="SortingBlockYears" style="display:none"></div><div class="SortingBlockSelect" id="SortingBlockSeason" style="display:none"></div><div class="SortingBlockSelect" id="SortingBlockTeam" style="display:none"></div><div class="SortingBlockSelect" id="SortingBlockType" style="display:none"></div><div class="CatalogBlock"><div class="CatalogList"><div style="display:flow-root"><h1 style="float:left">Избранные релизы</h1><div class="CatalogListButton" id="FavoritesList"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 226 226"><g><path fill="var(--ColorThemes3)" d="M207.16667,56.5v37.66667c0,5.198 -4.21867,9.41667 -9.41667,9.41667h-169.5c-5.198,0 -9.41667,-4.21867 -9.41667,-9.41667v-37.66667c0,-10.35833 8.475,-18.83333 18.83333,-18.83333h150.66667c10.35833,0 18.83333,8.475 18.83333,18.83333zM28.25,122.41667h169.5c5.198,0 9.41667,4.21867 9.41667,9.41667v37.66667c0,10.35833 -8.475,18.83333 -18.83333,18.83333h-150.66667c-10.35833,0 -18.83333,-8.475 -18.83333,-18.83333v-37.66667c0,-5.198 4.21867,-9.41667 9.41667,-9.41667z"></path></g></svg></div><div class="CatalogListButton" id="FavoritesGrid_Small" style="display:none"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g><path fill="var(--ColorThemes3)" d="M21.5,21.5c-3.96317,0 -7.16667,3.2035 -7.16667,7.16667v50.16667h35.83333v-57.33333zM64.5,21.5v57.33333h43v-57.33333zM121.83333,21.5v57.33333h35.83333v-50.16667c0,-3.96317 -3.2035,-7.16667 -7.16667,-7.16667zM14.33333,93.16667v50.16667c0,3.96317 3.2035,7.16667 7.16667,7.16667h28.66667v-57.33333zM64.5,93.16667v57.33333h43v-57.33333zM121.83333,93.16667v57.33333h28.66667c3.96317,0 7.16667,-3.2035 7.16667,-7.16667v-50.16667z"></path></g></svg></div><div class="CatalogListButton" id="FavoritesGrid" style="display:none"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 226 226"><g><path fill="var(--ColorThemes3)" d="M47.08333,28.25c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM141.25,28.25c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM47.08333,122.41667c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM141.25,122.41667c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333z"></path></g></svg></div><div class="CatalogListButton" id="FilterOpen"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 24 24" id="filterColor1" style="fill:var(--ColorThemes3)" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="m21 2h-18a1.0007 1.0007 0 0 0 -.8193 1.5732l6.8193 9.7422v7.6846a1.0015 1.0015 0 0 0 1.53.8481l4-2.5a1.0014 1.0014 0 0 0 .47-.8481v-5.1846l6.8193-9.7422a1.0007 1.0007 0 0 0 -.8193-1.5732z"></path></g></svg></div><div class="CatalogListButton" id="FilterClose" style="display:none"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 24 24" id="filterColor2" style="fill:var(--ColorThemes3)" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="M9,21V13.3154L2.1807,3.5732A1.0006,1.0006,0,0,1,3,2H21a1.0006,1.0006,0,0,1,.8193,1.5732L15,13.3154V18.5a1.0013,1.0013,0,0,1-.47.8481l-4,2.5A1.001,1.001,0,0,1,9,21ZM4.9209,4l5.8984,8.4268A1.0022,1.0022,0,0,1,11,13v6.1958l2-1.25V13a1.0022,1.0022,0,0,1,.1807-.5732L19.0791,4Z"></path></g></svg></div></div><div id="LineGenerator" class="LineGenerator"></div><div id="PHPSESSIDNone"><img src="img/libriatyan/4.webp"><br><br><p style="color:var(--ColorThemes3);margin-bottom:15px">Вы не авторизованы</p><a id="auchFav" href="/options" data-route>Авторизоваться</a></div><div id="FilterNone"><img src="img/libriatyan/4.webp"><br><br><p style="color:var(--ColorThemes3)">Ничего не найдено...</p></div></div></div>`;
		app.innerHTML = html;

		await this.setHTML();
		await this.sorting.init();

		const FavoritesGrid = document.getElementById('FavoritesGrid');
		const FavoritesList = document.getElementById('FavoritesList');
		const FavoritesGrid_Small = document.getElementById('FavoritesGrid_Small');

		Favorites.editStyle();

		document.title = 'Избранные релизы — LiteLibria';

		preloaderHide();


		FavoritesGrid.addEventListener('click', async function(e) {
			Favorites.editStyle(true);
		});
		FavoritesList.addEventListener('click', async function(e) {
			Favorites.editStyle(true);
		});
		FavoritesGrid_Small.addEventListener('click', async function(e) {
			Favorites.editStyle(true);
		});
	},
	loadAPI: async function () {
		let PHPSESSID = localStorage.getItem('PHPSESSID');

		if (!PHPSESSID || PHPSESSID == 'undefined') {
			return {"error": "You are not authorized"};
		}

		let url = config["titels_API"]+`user/favorites?session=${PHPSESSID}&filter=id,names,posters.medium,player.episodes,description,genres,type,in_favorites,code,season&limit=-1`;
		let data = await fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			if(data.error) return;
			return data.list;
		})
		if(data.error) {
			localStorage.setItem('PHPSESSID', '');
			return;
		}
		data.reverse();
		this.list = data;

		if(styleDebug) console.log('[Favorites load API] ok');

		return this.list;
	},
	setHTML: async function () {
		let PHPSESSID = localStorage.getItem('PHPSESSID');
		let PHPSESSIDNone = document.getElementById('PHPSESSIDNone');
		let FilterNone = document.getElementById('FilterNone');

		if (!PHPSESSID || PHPSESSID == 'undefined') {
			PHPSESSIDNone.setAttribute('data-state', 'active');
			return;
		}

		if(this.list.length == 0){
			this.list = await this.loadAPI();
		}
		if(this.list.length == 0){
			FilterNone.setAttribute('data-state', 'active');
		}

		for (let i = 0; this.list.length > i; i++) {
			let id = this.list[i].id;
			let name = this.list[i].names.ru;
			let description = this.list[i].description;
			let last = this.list[i].player.episodes.last;
			let genres = this.list[i].genres;

			let SerieType = () => {
				switch (this.list[i].type.code) {
					case 0:
						return "Фильм";
					case 2:
						return "OVA";
					case 3:
						return "ONA";
					case 4:
						return "Спешл";
					default:
						return "Серия";
				}
			}

			let TextSerie = `${last}${this.list[i].type.episodes 
					? ` из ${this.list[i].type.episodes}` 
					: ''}`;
			
			let hrefPosters = localStorage.getItem('postersMode') == 'webp' 
					? `${config["webpPosters"]}${id}.webp`
					: `${config["posters"]}${this.list[i].posters.medium.url}`;

			
			if(styleCatalog == 1){
				Card.LongHovers({
					idDOM: 'LineGenerator',
					last: last,
					posters: hrefPosters,
					name: name,
					genres: genres,
					description: description,
					id: id,
				});
			} else if(styleCatalog == 2){
				Card.SmallHovers({
					idDOM: 'LineGenerator',
					last: last,
					serie: TextSerie,
					type: SerieType(),
					posters: hrefPosters,
					id: id,
					name: name
				})
			} else {
				Card.MediumHovers({
					idDOM: 'LineGenerator',
					last: last,
					serie: TextSerie,
					posters: hrefPosters,
					name: name,
					genres: genres,
					description: description,
					id: id,
				})
			}
		}
	},
	editStyle: async function (edit = false){
		if(edit) styleCatalog >= 2 ? styleCatalog = 0 : styleCatalog = parseInt(styleCatalog) + 1; 
		if(edit) localStorage.setItem('styleCatalog', styleCatalog);

		if(styleCatalog == 1){
			FavoritesGrid.style.display = "none";
			FavoritesList.style.display = "";
			FavoritesGrid_Small.style.display = "none";
		} else if(styleCatalog == 2){
			FavoritesGrid.style.display = "none";
			FavoritesList.style.display = "none";
			FavoritesGrid_Small.style.display = "";
		} else {
			FavoritesGrid.style.display = "";
			FavoritesList.style.display = "none";
			FavoritesGrid_Small.style.display = "none";
		}

		if(edit) document.getElementById('LineGenerator').innerHTML = "";
		if(edit) await Favorites.setHTML();
	},
	sorting: {
		init: async function() {
			const SortingBlock = document.getElementById('SortingBlock');
			const FilterOpen = document.getElementById('FilterOpen');
			const FilterClose = document.getElementById('FilterClose');

			const SortingClear = document.getElementById('SortingClear');

			const SortingOrderBy = document.getElementById("SortingOrderBy");
			const SortingChecUpTop = document.getElementById("SortingChecUpTop");

			FilterOpen.addEventListener('click', async function(e) {
				SortingBlock.style.display = 'block';
				FilterOpen.style.display = 'none';
				FilterClose.style.display = 'block';
			});
			FilterClose.addEventListener('click', async function(e) {
				SortingBlock.style.display = 'none';
				FilterOpen.style.display = 'block';
				FilterClose.style.display = 'none';
			});

			SortingClear.addEventListener('click', async function(e) {
				Favorites.sorting.clear();
			});

			SortingOrderBy.addEventListener('change', async function (e) {
				document.getElementById('LineGenerator').innerHTML = '';
				Favorites.list = await Favorites.loadAPI();
				await Favorites.sorting.sortAPI();

				Favorites.setHTML();
			})
			SortingChecUpTop.addEventListener('click', async function (e) {
				document.getElementById('LineGenerator').innerHTML = '';
				Favorites.list = await Favorites.loadAPI();
				await Favorites.sorting.sortAPI();

				Favorites.setHTML();
			})
		},
		sortAPI: async function() {
			document.getElementById('LineGenerator').innerHTML = "";

			// Получаем значения посе фильтров и поисков
			let getValue = document.getElementById("SortingOrderBy").value;

			// Получаем значения из блока сортировки
			let getCheckbox = '1';
			if (document.querySelector('#SortingChecUpTop:checked')) {
				getCheckbox = '0';
			}

			if(getValue == 'year'){
				if (getCheckbox == '1'){
					Favorites.list.sort((a, b) => (a.season.year > b.season.year) ? 1 : -1);
				}else {
					Favorites.list.sort((a, b) => (a.season.year < b.season.year) ? 1 : -1);
				}
			} else if(getValue == 'codes'){
				if (getCheckbox == '1'){
					Favorites.list.sort((a, b) => (a.code > b.code) ? 1 : -1);
				}else {
					Favorites.list.sort((a, b) => (a.code < b.code) ? 1 : -1);
				}
			} else if(getValue == 'in_favorites'){
				if (getCheckbox == '1'){
					Favorites.list.sort((a, b) => (a.in_favorites > b.in_favorites) ? 1 : -1);
				}else {
					Favorites.list.sort((a, b) => (a.in_favorites < b.in_favorites) ? 1 : -1);
				}
			} else if(getValue == 'series'){
				if (getCheckbox == '1'){
					Favorites.list.sort((a, b) => (a.type.series > b.type.series) ? 1 : -1);
				}else {
					Favorites.list.sort((a, b) => (a.type.series < b.type.series) ? 1 : -1);
				}
			} else if(getValue == 'code'){
				if (getCheckbox == '1'){
					Favorites.list.sort((a, b) => (a.type.code > b.type.code) ? 1 : -1);
				}else {
					Favorites.list.sort((a, b) => (a.type.code < b.type.code) ? 1 : -1);
				}
			} else {
				Favorites.list.sort((a, b) => (a > b) ? 1 : -1);
			}
		},
		clear: async function() {
			document.getElementById('LineGenerator').innerHTML = '';
			Favorites.list = [];

			Favorites.setHTML();
		}
	},
	ckear: function() {
		Favorites.list = [];
	}
}