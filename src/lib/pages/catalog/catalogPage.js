const Catalog = {
	limit: 36,
	after: 0,
	scroll: true,
	list: [],
	sort: '{}',
	init: async function() {
		// let html = await fetch('/lib/pages/catalog/index.html').then((response) => response.text());
		let html = `<div class="SortingBlock" id="SortingBlock" style="display:none"><div class="SortingBlockForm"><button class="SortingChosenButton" id="SortingSelect_genres">Выбрать жанры</button><button class="SortingChosenButton" id="SortingSelect_year">Выбрать год</button><button class="SortingChosenButton" id="SortingSelect_season_code">Выбрать сезон</button><button class="SortingChosenButton" id="SortingSelect_team">Выбрать команду</button><button class="SortingChosenButton" id="SortingSelect_type">Тип релиза</button><span class="SortingContainer"><select class="SortingChosen" id="SortingOrderBy"><option value="" selected="selected">Сортировать по ...</option><option value="season.year">Году</option><option value="code">Названию</option><option value="in_favorites">Популярности</option><option value="type.episodes">Количеству серий</option><option value="season.code">Типу</option></select><label class="SortingCheckboxContainer"><input type="checkbox" id="SortingChecUpTop"><span class="SortingCheckmark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"/></svg></span></label></span><button class="SortingButton" id="SortingClear">Сбросить</button></div><div class="SortingBlockSelect" id="SortingBlock_genres" style="display:none"></div><div class="SortingBlockSelect" id="SortingBlock_year" style="display:none"></div><div class="SortingBlockSelect" id="SortingBlock_season_code" style="display:none"></div><div class="SortingBlockSelect" id="SortingBlock_team" style="display:none"></div><div class="SortingBlockSelect" id="SortingBlock_type" style="display:none"></div></div><div class="CatalogBlock"><div class="CatalogList"><div style="display:flow-root"><h1 style="float:left">Каталог</h1><div class="CatalogListButton" id="CatalogList"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 226 226"><g><path fill="var(--ColorThemes3)" d="M207.16667,56.5v37.66667c0,5.198 -4.21867,9.41667 -9.41667,9.41667h-169.5c-5.198,0 -9.41667,-4.21867 -9.41667,-9.41667v-37.66667c0,-10.35833 8.475,-18.83333 18.83333,-18.83333h150.66667c10.35833,0 18.83333,8.475 18.83333,18.83333zM28.25,122.41667h169.5c5.198,0 9.41667,4.21867 9.41667,9.41667v37.66667c0,10.35833 -8.475,18.83333 -18.83333,18.83333h-150.66667c-10.35833,0 -18.83333,-8.475 -18.83333,-18.83333v-37.66667c0,-5.198 4.21867,-9.41667 9.41667,-9.41667z"></path></g></svg></div><div class="CatalogListButton" id="CatalogGrid_Small" style="display:none"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g><path fill="var(--ColorThemes3)" d="M21.5,21.5c-3.96317,0 -7.16667,3.2035 -7.16667,7.16667v50.16667h35.83333v-57.33333zM64.5,21.5v57.33333h43v-57.33333zM121.83333,21.5v57.33333h35.83333v-50.16667c0,-3.96317 -3.2035,-7.16667 -7.16667,-7.16667zM14.33333,93.16667v50.16667c0,3.96317 3.2035,7.16667 7.16667,7.16667h28.66667v-57.33333zM64.5,93.16667v57.33333h43v-57.33333zM121.83333,93.16667v57.33333h28.66667c3.96317,0 7.16667,-3.2035 7.16667,-7.16667v-50.16667z"></path></g></svg></div><div class="CatalogListButton" id="CatalogGrid" style="display:none"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 226 226"><g><path fill="var(--ColorThemes3)" d="M47.08333,28.25c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM141.25,28.25c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM47.08333,122.41667c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333zM141.25,122.41667c-10.38658,0 -18.83333,8.44675 -18.83333,18.83333v37.66667c0,10.38658 8.44675,18.83333 18.83333,18.83333h37.66667c10.38658,0 18.83333,-8.44675 18.83333,-18.83333v-37.66667c0,-10.38658 -8.44675,-18.83333 -18.83333,-18.83333z"></path></g></svg></div><div class="CatalogListButton" id="FilterOpen"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 24 24" id="filterColor1" style="fill:var(--ColorThemes3)" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="m21 2h-18a1.0007 1.0007 0 0 0 -.8193 1.5732l6.8193 9.7422v7.6846a1.0015 1.0015 0 0 0 1.53.8481l4-2.5a1.0014 1.0014 0 0 0 .47-.8481v-5.1846l6.8193-9.7422a1.0007 1.0007 0 0 0 -.8193-1.5732z"></path></g></svg></div><div class="CatalogListButton" id="FilterClose" style="display:none"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" x="0" y="0" viewBox="0 0 24 24" id="filterColor2" style="fill:var(--ColorThemes3)" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="M9,21V13.3154L2.1807,3.5732A1.0006,1.0006,0,0,1,3,2H21a1.0006,1.0006,0,0,1,.8193,1.5732L15,13.3154V18.5a1.0013,1.0013,0,0,1-.47.8481l-4,2.5A1.001,1.001,0,0,1,9,21ZM4.9209,4l5.8984,8.4268A1.0022,1.0022,0,0,1,11,13v6.1958l2-1.25V13a1.0022,1.0022,0,0,1,.1807-.5732L19.0791,4Z"></path></g></svg></div><div class="CatalogListButton" id="getRandom"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 256 256"><g transform="scale(5.33333,5.33333)"><path fill="var(--ColorThemes3)" d="M24,3.98828c-1.48532,0 -2.96964,0.3474 -4.32812,1.04297c-0.0013,0.00065 -0.0026,0.0013 -0.00391,0.00195l-11.68555,6.01562c-1.82836,0.94163 -2.98242,2.83325 -2.98242,4.89063v16.12109c0,2.05674 1.15275,3.94774 2.98242,4.88867l11.68555,6.01758c0.00065,0.00065 0.0013,0.0013 0.00195,0.00195c2.71697,1.39113 5.94123,1.39113 8.6582,0c0.0013,-0.00065 0.0026,-0.0013 0.00391,-0.00195l11.68555,-6.01758c1.82836,-0.94163 2.98047,-2.83193 2.98047,-4.88867v-16.12109c0,-2.05625 -1.15156,-3.94751 -2.98047,-4.88867h-0.00195l-11.68359,-6.01758c-0.00065,-0.00065 -0.0013,-0.0013 -0.00195,-0.00195c-1.35844,-0.69557 -2.84476,-1.04297 -4.33008,-1.04297zM24,6.98828c1.01568,0 2.03238,0.23841 2.96289,0.71484l11.67969,6.01367c0.00065,0.00065 0.0013,0.0013 0.00195,0.00195c0.83433,0.42906 1.35352,1.28145 1.35352,2.2207v16.12109c0,0.93926 -0.51983,1.79229 -1.35547,2.22266l-11.68164,6.01367c-1.85973,0.95221 -4.05972,0.95278 -5.91992,0.00195l-0.00391,-0.00195l-11.68164,-6.01367c0,-0.00065 0,-0.0013 0,-0.00195c-0.83438,-0.42907 -1.35547,-1.28145 -1.35547,-2.2207v-16.12109c0,-0.94063 0.51983,-1.79229 1.35547,-2.22266l11.68359,-6.01367c0.93051,-0.47644 1.94526,-0.71484 2.96094,-0.71484zM24,12c-1.38071,0 -2.5,0.67157 -2.5,1.5c0,0.82843 1.11929,1.5 2.5,1.5c1.38071,0 2.5,-0.67157 2.5,-1.5c0,-0.82843 -1.11929,-1.5 -2.5,-1.5zM11.4707,14.49023c-0.69247,0.00592 -1.29091,0.48506 -1.44815,1.15947c-0.15724,0.67441 0.16759,1.36881 0.78604,1.68037l8.83203,4.58984c0.90769,0.4714 1.87497,0.77151 2.85938,0.92969v14.65039c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-14.65039c0.98374,-0.15827 1.95031,-0.45859 2.85742,-0.92969c0.00065,0 0.0013,0 0.00195,0l8.83203,-4.58789c0.73566,-0.38185 1.02248,-1.28778 0.64063,-2.02344c-0.38185,-0.73566 -1.28778,-1.02248 -2.02344,-0.64062l-8.83398,4.58984c-0.91329,0.47396 -1.90927,0.71365 -2.90625,0.72461c-0.03055,-0.00224 -0.06117,-0.00354 -0.0918,-0.00391c-0.01695,0.00101 -0.03388,0.00232 -0.05078,0.00391c-0.99627,-0.01113 -1.9898,-0.25069 -2.90234,-0.72461l-8.83203,-4.58789c-0.22137,-0.11936 -0.4692,-0.18115 -0.7207,-0.17969zM11.5,20c-0.82843,0 -1.5,1.11929 -1.5,2.5c0,1.38071 0.67157,2.5 1.5,2.5c0.82843,0 1.5,-1.11929 1.5,-2.5c0,-1.38071 -0.67157,-2.5 -1.5,-2.5zM35.5,21c-0.82843,0 -1.5,1.11929 -1.5,2.5c0,1.38071 0.67157,2.5 1.5,2.5c0.82843,0 1.5,-1.11929 1.5,-2.5c0,-1.38071 -0.67157,-2.5 -1.5,-2.5zM15.5,26c-0.82843,0 -1.5,1.11929 -1.5,2.5c0,1.38071 0.67157,2.5 1.5,2.5c0.82843,0 1.5,-1.11929 1.5,-2.5c0,-1.38071 -0.67157,-2.5 -1.5,-2.5zM30.5,30c-0.82843,0 -1.5,1.11929 -1.5,2.5c0,1.38071 0.67157,2.5 1.5,2.5c0.82843,0 1.5,-1.11929 1.5,-2.5c0,-1.38071 -0.67157,-2.5 -1.5,-2.5zM19.5,32c-0.82843,0 -1.5,1.11929 -1.5,2.5c0,1.38071 0.67157,2.5 1.5,2.5c0.82843,0 1.5,-1.11929 1.5,-2.5c0,-1.38071 -0.67157,-2.5 -1.5,-2.5z"></path></g></svg></div></div><div id="LineGenerator" class="LineGenerator"></div><div id="FilterNone" style="display:none"><img src="img/libriatyan/4.webp" style="width:145px"><br><br><p style="color:var(--ColorThemes3)">Ничего не найдено...</p></div><div id="eventCatalogloadAPI"></div><div id="CatalogAnim" class="LoadAnim" style="top:10px;position:relative;margin-left:auto;margin-right:auto;width:45px;display:none"><svg style="width:45px" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z" fill="#d53c3c"></path><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1400ms" repeatCount="indefinite"></animateTransform></g></svg></div></div></div>`;
		app.innerHTML = html;

		// Использую stringify из-за проблем Object.keys на iOS
		let params = Router.getParams();
		if(JSON.stringify(params).length > 2){
			this.list = [];
			this.sort = JSON.stringify(params);
		}
		if(this.sort != JSON.stringify(params)){
			this.list = [];
			this.sort = JSON.stringify(params);
		}

		await this.setHTML();
		await this.sorting.init(params);

		const CatalogGrid = document.getElementById('CatalogGrid');
		const CatalogList = document.getElementById('CatalogList');
		const CatalogGrid_Small = document.getElementById('CatalogGrid_Small');
		const CatalogAnim = document.getElementById('CatalogAnim');

		const getRandom = document.getElementById('getRandom');

		this.scroll = false;
		Catalog.editStyle();

		document.title = 'Каталог — LiteLibria';

		preloaderHide();


		window.addEventListener('scroll', async function(e) {
			if(pageAPP == 'catalog'){
				let eventCatalogloadAPI = document.getElementById("eventCatalogloadAPI");
				if(Catalog.list.length > 0){
					if (eventCatalogloadAPI.offsetTop <= (window.scrollY + window.innerHeight + 600)) {
						if(Catalog.scroll == false){
							Catalog.scroll = true;
							Catalog.after = Catalog.list.length;
							CatalogAnim.style.display = '';
							await Catalog.loadAPI();
							await Catalog.setHTML(true);
							Catalog.scroll = false;
							CatalogAnim.style.display = 'none';
						}
					}
				}
			}
		});
		CatalogGrid.addEventListener('click', async function(e) {
			Catalog.editStyle(true);
		});
		CatalogList.addEventListener('click', async function(e) {
			Catalog.editStyle(true);
		});
		CatalogGrid_Small.addEventListener('click', async function(e) {
			Catalog.editStyle(true);
		});

		getRandom.addEventListener('click', async function(e) {
			Catalog.getRandom();
		});
	},
	loadAPI: async function () {
		let afterText = this.after ? `&after=${this.after}` : '';
		let url;

		let params = Router.getParams();

		// Использую stringify из-за проблем Object.keys на iOS
		if(JSON.stringify(params).length > 2){
			let queryAPI = () => {
				let q = '';
				for (const key in params) {
					q += `${key}=${params[key]}&`
				}
				return q
			}

			let order_by = document.getElementById("SortingOrderBy").value;
			let sort_direction = 1;
			if(document.querySelector('#SortingChecUpTop:checked')) sort_direction = 0;

			url = config["titels_API"]+"title/search?"+queryAPI()+"filter=id,names,posters.medium,player.episodes,description,genres,type,in_favorites,code,season&order_by="+ order_by +"&sort_direction="+ sort_direction +"&limit=" + this.limit + afterText;

			if(document.getElementById('filterColor1')){
				document.getElementById('filterColor1').style.fill = 'var(--PrimaryColor)';
				document.getElementById('filterColor2').style.fill = 'var(--PrimaryColor)';
			}
			
		} else {
			url = config["titels_API"]+"title/updates?filter=id,names,posters.medium,player.episodes,description,genres,type,in_favorites,code,season&limit=" + this.limit + afterText;

			if(document.getElementById('filterColor1')){
				document.getElementById('filterColor1').style.fill = 'var(--ColorThemes3)';
				document.getElementById('filterColor2').style.fill = 'var(--ColorThemes3)';
			}
		}


		let data = await fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			return data['list'];
		})
		if(this.list.length == 0) this.list = data;
		else Array.prototype.push.apply(this.list, data);

		if(styleDebug) console.log('[Catalog load Api] ok');

		return this.list;
	},
	setHTML: async function (add = false) {
		
		if(this.list.length == 0){
			this.list = await this.loadAPI();
		}

		for (let i = add ? this.after : 0; this.list.length > i; i++) {
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
			CatalogGrid.style.display = "none";
			CatalogList.style.display = "";
			CatalogGrid_Small.style.display = "none";
		} else if(styleCatalog == 2){
			CatalogGrid.style.display = "none";
			CatalogList.style.display = "none";
			CatalogGrid_Small.style.display = "";
		} else {
			CatalogGrid.style.display = "";
			CatalogList.style.display = "none";
			CatalogGrid_Small.style.display = "none";
		}

		if(edit) document.getElementById('LineGenerator').innerHTML = "";
		if(edit) Catalog.after = 0;
		if(edit) await Catalog.setHTML();
	},
	sorting: {
		show: true,
		visual: false,

		list: {
			genres: [],
			years: [],
			team: []
		},

		init: async function(query) {
			await this.setHTML();

			const SortingBlock = document.getElementById('SortingBlock');
			const FilterOpen = document.getElementById('FilterOpen');
			const FilterClose = document.getElementById('FilterClose');
			const SortingSelectGenres = document.getElementById('SortingSelect_genres');
			const SortingSelectYears = document.getElementById('SortingSelect_year');
			const SortingSelectSeason = document.getElementById('SortingSelect_season_code');
			const SortingSelectTeam = document.getElementById('SortingSelect_team');
			const SortingSelectType = document.getElementById('SortingSelect_type');

			const SortingClear = document.getElementById('SortingClear');

			const SortingOrderBy = document.getElementById("SortingOrderBy")
			const SortingChecUpTop = document.getElementById("SortingChecUpTop")



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

			SortingSelectGenres.addEventListener('click', async function(e) {
				SortingSelect('genres');
			});
			SortingSelectYears.addEventListener('click', async function(e) {
				SortingSelect('year');
			});
			SortingSelectSeason.addEventListener('click', async function(e) {
				SortingSelect('season_code');
			});
			SortingSelectTeam.addEventListener('click', async function(e) {
				SortingSelect('team');
			});
			SortingSelectType.addEventListener('click', async function(e) {
				SortingSelect('type');
			});

			SortingClear.addEventListener('click', async function(e) {Object.keys
				Catalog.sorting.clear();
			});

			SortingOrderBy.addEventListener('change', function (e) {
				document.getElementById('LineGenerator').innerHTML = '';
				Catalog.after = 0;
				Catalog.list = [];

				Catalog.setHTML();
			})
			SortingChecUpTop.addEventListener('click', function (e) {
				document.getElementById('LineGenerator').innerHTML = '';
				Catalog.after = 0;
				Catalog.list = [];

				Catalog.setHTML();
			})



			// Включение акцента у выбраных фильтров
			for (const key in query) {
				let team = ['voice','translator','editing','decor','timing'];
				let params = team.includes(key) ? 'team' : key;
				document.getElementById(`SortingSelect_${params}`).setAttribute("data-sort", "select");

				let queryList = query[key].split(',')
				for (let i = 0; i < queryList.length; i++) {
					let name = queryList[i].replace('+', ' ');
					document.getElementById(`SB${key}_${name}`).setAttribute("data-state", "select");
				}
			}
		},
		loadAPI: async function() {
			await fetch(config["titels_API"]+"genres")
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				Catalog.sorting.list.genres = data;
			})
	
			await fetch(config["titels_API"]+"years")
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				Catalog.sorting.list.years = data;
			})
	
			await fetch(config["titels_API"]+"team")
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				Catalog.sorting.list.team = data;
			})
		},
		setHTML: async function() {
			if(this.list.genres.length == 0){
				await this.loadAPI();
			}

			let teamE = ['voice','translator','editing','decor','timing'];
			let teamR = ['Озвучка','Перевод','Редактура','Оформление','Тайминг'];

			const SortingBlockGenres = document.getElementById('SortingBlock_genres');
			const SortingBlockYears = document.getElementById('SortingBlock_year');
			const SortingBlockSeason = document.getElementById('SortingBlock_season_code');
			const SortingBlockTeam = document.getElementById('SortingBlock_team');
			const SortingBlockType = document.getElementById('SortingBlock_type');


			SortingBlockGenres.innerHTML = '';
			SortingBlockYears.innerHTML = '';
			SortingBlockSeason.innerHTML = '';
			SortingBlockTeam.innerHTML = '';
			SortingBlockType.innerHTML = '';


			// genres
			let div = document.createElement('div');
			div.className = 'SortingBlockSelectButton';

			for (let i = 0; this.list.genres.length > i; i++) {
				let button = document.createElement('button');
				div.appendChild(button);
				button.className = 'SortingSelectChosen';
				button.id = 'SBgenres_'+this.list.genres[i];
				button.setAttribute('onclick', `Catalog.sorting.select("genres", "${this.list.genres[i]}", "SBgenres_${this.list.genres[i]}")`);
				button.innerHTML = this.list.genres[i];
			}
			SortingBlockGenres.appendChild(div);


			// years
			div = document.createElement('div');
			div.className = 'SortingBlockSelectButton';
			for (let i = 0; this.list.years.length > i; i++) {
				let button = document.createElement('button');
				div.appendChild(button);
				button.className = 'SortingSelectChosen';
				button.id = 'SByear_'+this.list.years[i];
				button.setAttribute('onclick', `Catalog.sorting.select("year", "${this.list.years[i]}", "SByear_${this.list.years[i]}")`);
				button.innerHTML = this.list.years[i];
			}
			SortingBlockYears.appendChild(div);


			// 'voice','translator','editing','decor','timing'
			for (const key in teamE) {
				let p = document.createElement('p');
				let div = document.createElement('div');

				p.innerHTML = teamR[key]+":";
				div.className = 'SortingBlockSelectButton';
				for (let i = 0; this.list.team[teamE[key]].length > i; i++) {
					let button = document.createElement('button');
					div.appendChild(button);
					button.className = 'SortingSelectChosen';
					button.id = `SB${teamE[key]}_${this.list.team[teamE[key]][i]}`;
					button.setAttribute('onclick', `Catalog.sorting.select("${teamE[key]}", "${this.list.team[teamE[key]][i]}", "SB${teamE[key]}_${this.list.team[teamE[key]][i]}")`);
					button.innerHTML = this.list.team[teamE[key]][i];
				}
				SortingBlockTeam.appendChild(p);
				SortingBlockTeam.appendChild(div);
			}


			SortingBlockSeason.innerHTML = `
				<div class="SortingBlockSelectButton">
					<button class="SortingSelectChosen" id="SBseason_code_1" onclick="Catalog.sorting.select('season_code', '1', 'SBseason_code_1')">Зима</button>
					<button class="SortingSelectChosen" id="SBseason_code_2" onclick="Catalog.sorting.select('season_code', '2', 'SBseason_code_2')">Весна</button>
					<button class="SortingSelectChosen" id="SBseason_code_3" onclick="Catalog.sorting.select('season_code', '3', 'SBseason_code_3')">Лето</button>
					<button class="SortingSelectChosen" id="SBseason_code_4" onclick="Catalog.sorting.select('season_code', '4', 'SBseason_code_4')">Осень</button>
				</div>
			`;

			SortingBlockType.innerHTML = `
				<div class="SortingBlockSelectButton">
					<button class="SortingSelectChosen" id="SBtype_0" onclick="Catalog.sorting.select('type', '0', 'SBtype_0')">Фильм</button>
					<button class="SortingSelectChosen" id="SBtype_1" onclick="Catalog.sorting.select('type', '1', 'SBtype_1')">TV</button>
					<button class="SortingSelectChosen" id="SBtype_2" onclick="Catalog.sorting.select('type', '2', 'SBtype_2')">OVA</button>
					<button class="SortingSelectChosen" id="SBtype_3" onclick="Catalog.sorting.select('type', '3', 'SBtype_3')">ONA</button>
					<button class="SortingSelectChosen" id="SBtype_4" onclick="Catalog.sorting.select('type', '4', 'SBtype_4')">Спешл</button>
					<button class="SortingSelectChosen" id="SBtype_5" onclick="Catalog.sorting.select('type', '5', 'SBtype_5')">WEB</button>
				</div>
			`;
		},
		select: async function(key, value, id) {
			Catalog.sort = JSON.stringify(value);
			document.getElementById('LineGenerator').innerHTML = '';
			Catalog.after = 0;
			Catalog.list = [];
			if(document.getElementById(id).getAttribute('data-state') == "select"){
				document.getElementById(id).setAttribute("data-state", "");
			} else {
				document.getElementById(id).setAttribute("data-state", "select");
			}

			Router.update(key, value);

			let team = ['voice','translator','editing','decor','timing'];
			let params = team.includes(key) ? 'team' : key;
			if(Router.getParams()[key]){
				document.getElementById(`SortingSelect_${params}`).setAttribute("data-sort", "select");
			} else {
				document.getElementById(`SortingSelect_${params}`).setAttribute("data-sort", "");
			}

			Catalog.setHTML();
		},
		clear: async function() {
			const SortingSelectGenres = document.getElementById('SortingSelect_genres');
			const SortingSelectYears = document.getElementById('SortingSelect_year');
			const SortingSelectSeason = document.getElementById('SortingSelect_season_code');
			const SortingSelectTeam = document.getElementById('SortingSelect_team');
			const SortingSelectType = document.getElementById('SortingSelect_type');
			
			SortingSelectGenres.setAttribute("data-sort", "");
			SortingSelectYears.setAttribute("data-sort", "");
			SortingSelectSeason.setAttribute("data-sort", "");
			SortingSelectTeam.setAttribute("data-sort", "");
			SortingSelectType.setAttribute("data-sort", "");


			this.show = true;
			this.visual = false;

			document.getElementById('LineGenerator').innerHTML = '';
			Catalog.after = 0;
			Catalog.list = [];
			Catalog.sort = '';

			history.replaceState({position: 0}, null, window.location.origin + window.location.pathname);
			Catalog.setHTML();
			Catalog.sorting.setHTML();
		}
	},
	ckear: function() {
		Catalog.after = 0;
		Catalog.list = [];
	},
	getRandom: function() {
		fetch(config["titels_API"]+"title/random?filter=id")
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			Router.navigate("/release/" + data["id"]);
		})
	}
}

function SortingSelect(id){
	let edit = true;

	const SortingSelectGenres = document.getElementById('SortingSelect_genres');
	const SortingBlockGenres = document.getElementById('SortingBlock_genres');
	const SortingSelectYears = document.getElementById('SortingSelect_year');
	const SortingBlockYears = document.getElementById('SortingBlock_year');
	const SortingSelectSeason = document.getElementById('SortingSelect_season_code');
	const SortingBlockSeason = document.getElementById('SortingBlock_season_code');
	const SortingSelectTeam = document.getElementById('SortingSelect_team');
	const SortingBlockTeam = document.getElementById('SortingBlock_team');
	const SortingSelectType = document.getElementById('SortingSelect_type');
	const SortingBlockType = document.getElementById('SortingBlock_type');

	if(document.getElementById(`SortingBlock_${id}`).style.display == '') edit = false;

	SortingSelectGenres.setAttribute("data-state", "");
	SortingSelectYears.setAttribute("data-state", "");
	SortingSelectSeason.setAttribute("data-state", "");
	SortingSelectTeam.setAttribute("data-state", "");
	SortingSelectType.setAttribute("data-state", "");

	SortingBlockGenres.style.display = 'none';
	SortingBlockYears.style.display = 'none';
	SortingBlockSeason.style.display = 'none';
	SortingBlockTeam.style.display = 'none';
	SortingBlockType.style.display = 'none';

	if(edit == true){
		document.getElementById(`SortingSelect_${id}`).setAttribute("data-state", "select");

		document.getElementById(`SortingBlock_${id}`).style.display = '';
	}
}