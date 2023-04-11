const Search = {
	list: [],
	q: '',
	init: async function(query) {
		// let html = await fetch('/lib/pages/search/index.html').then((response) => response.text());
		let html = `<div class="CatalogBlock"><div class="CatalogList"><div style="display:flow-root"><h1 style="float:left">Поиск релизов</h1><div class="CatalogListButton" id="SearchList"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 226 226"><g><path fill="var(--ColorThemes3)" d="M207.16667,56.5v37.66667c0,5.198 -4.21867,9.41667 -9.41667,9.41667h-169.5c-5.198,0 -9.41667,-4.21867 -9.41667,-9.41667v-37.66667c0,-10.35833 8.475,-18.83333 18.83333,-18.83333h150.66667c10.35833,0 18.83333,8.475 18.83333,18.83333zM28.25,122.41667h169.5c5.198,0 9.41667,4.21867 9.41667,9.41667v37.66667c0,10.35833 -8.475,18.83333 -18.83333,18.83333h-150.66667c-10.35833,0 -18.83333,-8.475 -18.83333,-18.83333v-37.66667c0,-5.198 4.21867,-9.41667 9.41667,-9.41667z"></path></g></svg></div><div class="CatalogListButton" id="SearchGrid_Small" style="display:none"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g><path fill="var(--ColorThemes3)" d="M21.5,21.5c-3.96317,0 -7.16667,3.2035 -7.16667,7.16667v50.16667h35.83333v-57.33333zM64.5,21.5v57.33333h43v-57.33333zM121.83333,21.5v57.33333h35.83333v-50.16667c0,-3.96317 -3.2035,-7.16667 -7.16667,-7.16667zM14.33333,93.16667v50.16667c0,3.96317 3.2035,7.16667 7.16667,7.16667h28.66667v-57.33333zM64.5,93.16667v57.33333h43v-57.33333zM121.83333,93.16667v57.33333h28.66667c3.96317,0 7.16667,-3.2035 7.16667,-7.16667v-50.16667z"></path></g></svg></div><div class="CatalogListButton" id="SearchGrid" style="display:none"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 226 226"><g><path fill="var(--ColorThemes3)" d="M47.08333,28.25c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM141.25,28.25c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM47.08333,122.41667c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM141.25,122.41667c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333z"></path></g></svg></div></div><div id="SearchContainer"><svg id="SearchIcon" data-state="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"></path></svg><svg id="SearchAnim" xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 128 128"><g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z"></path><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1400ms" repeatCount="indefinite"></animateTransform></g></svg><input type="text" id="search_q" name="q" placeholder="Поиск релиза..."></div><div id="LineGenerator" class="LineGenerator"></div><div id="FilterNone" style="display:none"><img src="img/libriatyan/4.webp" style="width:145px"><br><br><p style="color:var(--ColorThemes3)">Ничего не найдено...</p></div></div></div>`;
		app.innerHTML = html;

		let SearchGrid = document.getElementById('SearchGrid');
		let SearchList = document.getElementById('SearchList');
		let SearchGrid_Small = document.getElementById('SearchGrid_Small');
		let SearchDOM = document.getElementById('LineGenerator');
		let SearchIcon = document.getElementById('SearchIcon');
		let SearchAnim = document.getElementById('SearchAnim');
		let Search_q = document.getElementById('search_q');

		this.scroll = false;
		Search.editStyle();

		document.title = 'Поиск — LiteLibria';

		preloaderHide();

		Search_q.addEventListener("input", function (e) {
			Search.q = Search_q.value;
			Search.list = [];
			SearchDOM.innerHTML = '';

			Search.saveStorage(Search_q.value);

			if(Search_q.value.length > 2){
				SearchIcon.dataset.state = '';
				SearchAnim.dataset.state = 'active';
				Search.setHTML({"q": Search_q.value});
			}
			if(Search_q.value.length <= 2){
				SearchIcon.dataset.state = 'active';
				SearchAnim.dataset.state = '';
			}
		})

		SearchGrid.addEventListener('click', async function(e) {
			Search.editStyle(true);
		});
		SearchList.addEventListener('click', async function(e) {
			Search.editStyle(true);
		});
		SearchGrid_Small.addEventListener('click', async function(e) {
			Search.editStyle(true);
		});

		await this.setHTML(query);
	},
	loadAPI: async function (query) {
		let url = config["titels_API"]+`title/search?search=${query.q}&filter=id,names,posters.medium,player.episodes,description,genres,type,in_Search,code,season&limit=-1`;

		let data = await fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			return data['list'];
		})
		this.list = data;

		if(styleDebug) console.log('[Search load API] ok');

		return this.list;
	},
	setHTML: async function (query) {
		let SearchIcon = document.getElementById('SearchIcon');
		let SearchAnim = document.getElementById('SearchAnim');
		let SearchContainer = document.getElementById('SearchContainer');
		let Search_q = SearchContainer.querySelector('input[name="q"]');
		
		if(this.list.length == 0){
			if(JSON.stringify(query).length > 2) this.list = await this.loadAPI(query);
			else this.list =  await this.getStorage();
		}

		if(Search.q && Search_q.value.length == 0){
			Search_q.value = Search.q;
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
					id: id
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

		SearchIcon.dataset.state = 'active';
		SearchAnim.dataset.state = '';
	},
	editStyle: async function (edit = false){
		if(edit) styleCatalog >= 2 ? styleCatalog = 0 : styleCatalog = parseInt(styleCatalog) + 1; 
		if(edit) localStorage.setItem('styleCatalog', styleCatalog);

		if(styleCatalog == 1){
			SearchGrid.style.display = "none";
			SearchList.style.display = "";
			SearchGrid_Small.style.display = "none";
		} else if(styleCatalog == 2){
			SearchGrid.style.display = "none";
			SearchList.style.display = "none";
			SearchGrid_Small.style.display = "";
		} else {
			SearchGrid.style.display = "";
			SearchList.style.display = "none";
			SearchGrid_Small.style.display = "none";
		}

		if(edit) document.getElementById('LineGenerator').innerHTML = "";
		if(edit) await Search.setHTML();
	},
	ckear: function() {
		Search.list = [];
	},
	getStorage: async function() {
		if(!localStorage.getItem('search')) return {};
		if(localStorage.getItem('search').length > 0){
			Search.q = localStorage.getItem('search');
			return await this.loadAPI({"q": localStorage.getItem('search')});
		}
		return {};
	},
	saveStorage: function(value) {
		localStorage.setItem('search', value);
	},
}