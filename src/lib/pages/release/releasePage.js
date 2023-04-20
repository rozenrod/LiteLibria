const Release = {
	list: [],
	init: async function(id) {
		// let html = await fetch('/lib/pages/release/index.html').then((response) => response.text());
		let html = `<div class="ReleaseBlock"><div class="ReleaseBlockReverse"><div class="ReleaseBlockAbout"><div id="ReleaseBlockAboutPoster"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg><img id="ReleasePoster1" src="" alt=""></div><div class="ReleaseBlockAboutDetail"><p id="ReleaseNamesRu"><span class="TextLoad TextLoadW"></span></p><p id="ReleaseGenres"><span class="TextLoad TextLoadW" data="TextLoad1"></span><span class="TextLoad TextLoadW" data="TextLoad1"></span><span class="TextLoad TextLoadW" data="TextLoad1"></span></p><div id="ReleaseWeekDay"><a href="/schedule/0" data-route id="ReleaseWeekDay-0">Пн</a><a href="/schedule/1" data-route id="ReleaseWeekDay-1">Вт</a><a href="/schedule/2" data-route id="ReleaseWeekDay-2">Ср</a><a href="/schedule/3" data-route id="ReleaseWeekDay-3">Чт</a><a href="/schedule/4" data-route id="ReleaseWeekDay-4">Пт</a><a href="/schedule/5" data-route id="ReleaseWeekDay-5">Сб</a><a href="/schedule/6" data-route id="ReleaseWeekDay-6">Вс</a></div><div id="ReleasePersonal"><p id="ReleaseFavorite"><span class="TextLoad TextLoadB" data="TextLoad3"></span></p><div title="Отписатся от уведомлений" id="delSub"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 16 L 4.4648438 17.15625 L 4.4628906 17.15625 A 1 1 0 0 0 4 18 A 1 1 0 0 0 5 19 L 12 19 L 19 19 A 1 1 0 0 0 20 18 A 1 1 0 0 0 19.537109 17.15625 L 18 16 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 10 20 C 10 21.1 10.9 22 12 22 C 13.1 22 14 21.1 14 20 L 10 20 z"/></svg></div><div title="Подписатся на уведомления" id="addSub"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 16 L 4.4648438 17.15625 L 4.4628906 17.15625 A 1 1 0 0 0 4 18 A 1 1 0 0 0 5 19 L 12 19 L 19 19 A 1 1 0 0 0 20 18 A 1 1 0 0 0 19.537109 17.15625 L 18 16 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 10 20 C 10 21.1 10.9 22 12 22 C 13.1 22 14 21.1 14 20 L 10 20 z"/></svg></div><div title="Удалить из избранное" id="delFavorite"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><path d="M86,129.65217l35.61117,21.49283c5.61867,3.38983 12.54883,-1.64833 11.05817,-8.03383l-9.45283,-40.51317l31.46883,-27.262c4.95933,-4.29283 2.30767,-12.44133 -4.22833,-12.99317l-41.42333,-3.51167l-16.20383,-38.23417c-2.5585,-6.02717 -11.10117,-6.02717 -13.65967,0l-16.20383,38.23417l-41.42333,3.51167c-6.536,0.55183 -9.18767,8.70033 -4.22833,12.99317l31.46883,27.262l-9.45283,40.51317c-1.49067,6.3855 5.4395,11.42367 11.05817,8.03383z"></path></svg></div><div title="Добавить в избранное" id="addFavorite"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><path d="M86,129.65217l35.61117,21.49283c5.61867,3.38983 12.54883,-1.64833 11.05817,-8.03383l-9.45283,-40.51317l31.46883,-27.262c4.95933,-4.29283 2.30767,-12.44133 -4.22833,-12.99317l-41.42333,-3.51167l-16.20383,-38.23417c-2.5585,-6.02717 -11.10117,-6.02717 -13.65967,0l-16.20383,38.23417l-41.42333,3.51167c-6.536,0.55183 -9.18767,8.70033 -4.22833,12.99317l31.46883,27.262l-9.45283,40.51317c-1.49067,6.3855 5.4395,11.42367 11.05817,8.03383z"></path></svg></div></div><div id="ReleaseSYTC"><a id="ReleaseSeasonYear" data-route><span class="TextLoad TextLoadR" data="TextLoad2"></span></a><a id="ReleaseTypeCode" data-route><span class="TextLoad TextLoadR" data="TextLoad3"></span></a></div><div id="ReleaseBlockAnnounce"><h3 id="ReleaseAnnounce"></h3></div><div id="ReleaseBlockText"><p id="ReleaseDescription"><span class="TextLoad" data="TextLoad4"></span><span class="TextLoad" data="TextLoad5"></span><span class="TextLoad" data="TextLoad6"></span><span class="TextLoad" data="TextLoad4"></span><span class="TextLoad" data="TextLoad5"></span><span class="TextLoad" data="TextLoad6"></span></p><div id="Hidden-2"><br><p id="ReleaseStatus">Статус:</p><p id="ReleaseVoice">Озвучка:</p><p id="ReleaseTiming">Тайминг:</p><p id="ReleaseTranslator">Перевод:</p><p id="ReleaseEditing">Редактура:</p><p id="ReleaseDecor">Оформление:</p><br><p id="ReleaseNamesEn">Навзание EN:</p><br><p id="ReleaseSHIKIMORI"><a href="https://shikimori.one/animes?search=" target="_blank">Поиск SHIKIMORI</a></p><br><img id="ReleasePoster2" src="" alt=""></div><br><p id="ReleaseViewAll"><a>Подробнее...</a></p></div></div></div><div class="ReleaseBlockPlayer" id="ReleaseBlockPlayerRuTube"><div class="ReleaseBlockPlayerLeft" id="ReleasePlayerRuTube"></div><div class="ReleaseBlockPlayerRight" id="PlaySerieRuTube"><div class="posterSerie"></div><div class="posterSerie"></div><div class="posterSerie"></div><div class="posterSerie"></div><div class="posterSerie"></div><div class="posterSerie"></div></div></div><div class="ReleaseBlockPlayer" id="ReleaseBlockPlayer"><div class="ReleaseBlockPlayerLeft" id="ReleasePlayer"><div id="player"></div></div><div class="ReleaseBlockPlayerRight" id="PlaySerie"><div class="posterSerie"></div><div class="posterSerie"></div><div class="posterSerie"></div><div class="posterSerie"></div><div class="posterSerie"></div><div class="posterSerie"></div></div></div></div><div class="ReleaseBlockSliders"><div id="ReleaseBlockRelated"><h3>Связанные релизы</h3><div id="ReleaseRelated"></div></div><div id="ReleaseBlockRecomend"><h3>Вам также может понравиться</h3><div id="ReleaseRecomend"></div></div><details class="ReleaseBlockSlidersDetails" id="PlayerP2PGraf" style="display:none"><summary>Информация о вашем подключении.</summary><div id="chart_containerPad"><div id="chart_container"><div id="legend"></div><div id="legend-totals"></div><div id="y_axis"></div><div id="chart"></div></div></div><div id="graph"></div><p style="font-size:16px;margin:5px 20px">Трекеры:</p><p style="font-size:14px" id="trackerAnnounce"></p></details><div class="ReleaseBlockSlidersDetails" id="PlayerKeys"><p><span>Клавиша F</span><span>Полноэкранный режим видео</span></p><p><span>Клавиша M</span><span>Включение / выключение звука</span></p><p><span>Пробел</span><span>Переключение пуск / пауза</span></p><p><span>Стрелки ← и →</span><span>Перемотка</span></p></div><div class="ReleaseBlockSlidersDetails" id="PlayerP2PText" style="display:none"><center><p style="font-size:17px">Приложение использует P2P подключение!</p></center><p>Как это устроено? Очень просто. У нас 4 пользователя, которые хотят посмотреть новую серию любимого аниме. Все 4 пользователя начали смотреть серию не одновременно, а с интервалом в 2-10 минут. Самый первый загрузит серию с сервера AniLibria.tv. Второй и последующие пользователи загрузят большую часть у тех пользователей, которые уже немного прогрузили серию и совсем немного с сервера AniLibria.tv.</p><p>Зачем это нужно? Для того, чтоб сервера AniLibria.tv были менее загружены, и больше людей смогли посмотреть новую серию без проблем.</p></div></div></div>`
		app.innerHTML = html;

		historyConvert();

		await this.setHTML(id);

		preloaderHide();

		return this;
	},
	loadAPI: async function (id) {
		let url = config["titels_API"]+'title?id='+id+'&remove=torrents';

		this.list = await fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			return data;
		})

		return this.list;
	},
	setHTML: async function(id) {
		this.list = await this.loadAPI(id);

		document.title = this.list.names.ru + ' — LiteLibria';

		playerName = this.list.names.ru;
		playerLength = this.list.type.episodes;

		let postersMode = localStorage.getItem('postersMode');

		let ReleaseBlockAboutPoster = document.getElementById("ReleaseBlockAboutPoster");
		let ReleasePoster1 = document.getElementById("ReleasePoster1");
		let ReleasePoster2 = document.getElementById("ReleasePoster2");
		let ReleaseNamesRu = document.getElementById("ReleaseNamesRu");
		let ReleaseGenres = document.getElementById("ReleaseGenres");
		let ReleaseWeekDay = document.getElementById("ReleaseWeekDay");
		let ReleaseFavorite = document.getElementById("ReleaseFavorite");

		let ReleaseSeasonYear = document.getElementById("ReleaseSeasonYear");
		let ReleaseTypeCode = document.getElementById("ReleaseTypeCode");

		let ReleaseBlockAnnounce = document.getElementById("ReleaseBlockAnnounce");
		let ReleaseAnnounce = document.getElementById("ReleaseAnnounce");
		let ReleaseDescription = document.getElementById("ReleaseDescription");
		let ReleaseStatus = document.getElementById("ReleaseStatus");
		let ReleaseVoice = document.getElementById("ReleaseVoice");
		let ReleaseTiming = document.getElementById("ReleaseTiming");
		let ReleaseTranslator = document.getElementById("ReleaseTranslator");
		let ReleaseEditing = document.getElementById("ReleaseEditing");
		let ReleaseDecor = document.getElementById("ReleaseDecor");
		let ReleaseNamesEn = document.getElementById("ReleaseNamesEn");
		let ReleaseSHIKIMORI = document.getElementById("ReleaseSHIKIMORI");

		let ReleaseViewAll = document.getElementById('ReleaseViewAll');

		let PlaySerie = document.getElementById('PlaySerie');
		let ReleasePlayer = document.getElementById('ReleasePlayer');

		let genres = () => {
			if(this.list.genres.length == 0) return '';
			let a;
			for (const key in this.list.genres) {
				if(a == null) a = `<a href="/catalog?genres=${this.list.genres[key]}" data-route>${this.list.genres[key]}</a>`;
				else a = `${a}, <a href="/catalog?genres=${this.list.genres[key]}" data-route>${this.list.genres[key]}</a>`;
			}
			return a;
		}
		let voice = () => {
			if(this.list.team.voice.length == 0) return '';
			let a;
			for (const key in this.list.team.voice) {
				if(a == null) a = `<a href="/catalog?voice=${this.list.team.voice[key]}" data-route>${this.list.team.voice[key]}</a>`;
				else a = `${a}, <a href="/catalog?voice=${this.list.team.voice[key]}" data-route>${this.list.team.voice[key]}</a>`;
			}
			return `Озвучка: ${a}`;
		}
		let timing = () => {
			if(this.list.team.timing.length == 0) return '';
			let a;
			for (const key in this.list.team.timing) {
				if(a == null) a = `<a href="/catalog?timing=${this.list.team.timing[key]}" data-route>${this.list.team.timing[key]}</a>`;
				else a = `${a}, <a href="/catalog?timing=${this.list.team.timing[key]}" data-route>${this.list.team.timing[key]}</a>`;
			}
			return `Тайминг: ${a}`;
		}
		let translator = () => {
			if(this.list.team.translator.length == 0) return '';
			let a;
			for (const key in this.list.team.translator) {
				if(a == null) a = `<a href="/catalog?translator=${this.list.team.translator[key]}" data-route>${this.list.team.translator[key]}</a>`;
				else a = `${a}, <a href="/catalog?translator=${this.list.team.translator[key]}" data-route>${this.list.team.translator[key]}</a>`;
			}
			return `Перевод: ${a}`;
		}
		let editing = () => {
			if(this.list.team.editing.length == 0) return '';
			let a;
			for (const key in this.list.team.editing) {
				if(a == null) a = `<a href="/catalog?editing=${this.list.team.editing[key]}" data-route>${this.list.team.editing[key]}</a>`;
				else a = `${a}, <a href="/catalog?editing=${this.list.team.editing[key]}" data-route>${this.list.team.editing[key]}</a>`;
			}
			return `Редактура: ${a}`;
		}
		let decor = () => {
			if(this.list.team.decor.length == 0) return '';
			let a;
			for (const key in this.list.team.decor) {
				if(a == null) a = `<a href="/catalog?decor=${this.list.team.decor[key]}" data-route>${this.list.team.decor[key]}</a>`;
				else a = `${a}, <a href="/catalog?decor=${this.list.team.decor[key]}" data-route>${this.list.team.decor[key]}</a>`;
			}
			return `Оформление: ${a}`;
		}

		if(this.list.player.episodes.last == null){
			ReleaseBlockAboutPoster.setAttribute("style", "display:flex;");
		}

		ReleasePoster1.src = postersMode == 'webp' ? config["webpPosters"]+this.list.id+'.webp' : config["posters"]+this.list.posters.medium.url;

		ReleasePoster2.src = config["posters"]+this.list.posters.medium.url;

		ReleaseNamesRu.innerHTML = this.list.names.ru;
		
		ReleaseGenres.innerHTML = genres();

		if (this.list.status.code == '1' || this.list.status.code == '4') {
			ReleaseWeekDay.setAttribute("data-state", "active");
			let week_day = this.list.season.week_day;
			for (let i = 0; i <= 6; i++) {
				if (week_day == i) document.getElementById(`ReleaseWeekDay-${i}`).setAttribute("data-state", "active");
			}
		}

		ReleaseFavorite.innerHTML = `В избранном у  ${this.list.in_favorites || 0}`;

		if (this.list.season.year && this.list.season.string){
			ReleaseSeasonYear.setAttribute("href", `/catalog?year=${this.list.season.year}&season_code=${this.list.season.code}`);
			ReleaseSeasonYear.innerHTML = `${this.list.season.year} ${this.list.season.string}`;
		} else if (this.list.season.year){
			ReleaseSeasonYear.setAttribute("href", `/catalog?year=${this.list.season.year}`);
			ReleaseSeasonYear.innerHTML = `${this.list.season.year}`;
		} else if (this.list.season.string){
			ReleaseSeasonYear.setAttribute("href", `/catalog?season_code=${this.list.season.code}`);
			ReleaseSeasonYear.innerHTML = `${this.list.season.string}`;
		}

		if (document.documentElement.clientWidth <= '375' && this.list.type.full_string.length >= 15) {
			ReleaseTypeCode.innerHTML = this.list.type.full_string.substr(0, 15) + '...';
		} else {
			ReleaseTypeCode.innerHTML = this.list.type.full_string;
		}
		ReleaseTypeCode.setAttribute("href", `/catalog?type=${+this.list.type.code}`);


		if(this.list.status.code == 1) if(this.list.announce) ReleaseBlockAnnounce.setAttribute("data-state", `active`);
		ReleaseAnnounce.innerHTML =  this.list.announce;

		this.list.description 
			? ReleaseDescription.innerHTML = 
				`
					${this.list.description.substr(0, 370)}
					<span id="Hidden-3" data-state="active">...</span>
					<span id="Hidden-1">${this.list.description.substr(370)}</span>
				` 
			: ReleaseDescription.innerHTML =
				`	
					${this.list.names.ru}
					<span id="Hidden-3" data-state="active"></span>
					<span id="Hidden-1"></span>
				` ;
		
		if(this.list.status.string) ReleaseStatus.innerHTML = `Статус: ${this.list.status.string}`;
		
		ReleaseVoice.innerHTML = voice();

		ReleaseTiming.innerHTML = timing();

		ReleaseTranslator.innerHTML = translator();

		ReleaseEditing.innerHTML = editing();

		ReleaseDecor.innerHTML = decor();

		ReleaseNamesEn.innerHTML = `Навзание EN: ${this.list.names.en}`;

		ReleaseSHIKIMORI.querySelector('a').href = `https://shikimori.me/animes?search=${this.list.names.en}`;

		if(this.list.player.episodes.last == 1){
			PlaySerie.setAttribute("style", "display:none;");
			ReleasePlayer.dataset.state = 'SerieOne';
		}

		ReleaseViewAll.addEventListener('click', function(e){
			let Hidden1 = document.getElementById('Hidden-1');
			let Hidden2 = document.getElementById('Hidden-2');
			let Hidden3 = document.getElementById('Hidden-3');

			Hidden1.setAttribute("data-state", Hidden1.getAttribute("data-state") == "active" ? '' : 'active');
			Hidden2.setAttribute("data-state", Hidden2.getAttribute("data-state") == "active" ? '' : 'active');
			Hidden3.setAttribute("data-state", Hidden3.getAttribute("data-state") == "active" ? '' : 'active');
			ReleaseViewAll.querySelector('a').innerHTML = Hidden3.getAttribute("data-state") == "" ? 'Скрыть...' : 'Подробнее...';
		})

		if(p2pMode) document.getElementById("PlayerP2PGraf").setAttribute("style", "");
		if(p2pMode) document.getElementById("PlayerP2PText").setAttribute("style", "");


		if(Object.keys(this.list.player.list).length != 0) Release.loadPlayerJS(id);
		else {
			document.getElementById('ReleaseBlockPlayer').style.display = 'none';
			document.getElementById('PlayerKeys').style.display = 'none';
			if(Object.keys(this.list.player.rutube).length != 0){
				document.getElementById('ReleaseBlockPlayerRuTube').style.display = 'flex';
				document.getElementById('ReleasePlayerRuTube').innerHTML= `<iframe id="PlayerRuTube" src="https://rutube.ru/play/embed/${this.list.player.rutube['1']['rutube_id']}?skinColor=d53c3c" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>`
				Release.loadRuTube(id);
			}
		}
		
		if(Release.list.franchises) await Release.setFranchises.setHTML(id);
		else await Release.setRelated.setHTML(id);

		await Release.setRecomend.setHTML();
		if(localStorage.getItem('PHPSESSID')) Release.checkFavorites.setHTML(id);
		if (localStorage.getItem('WebPushMode') == 'WebPushSubManual') await Release.checkSubscriptions(id);
	},
	setRelated: {
		'list': [],
		'loadAPI': async function () {
			let url = 'https://API.litelibria.com/RelatedReleases.json';
	
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				return data;
			})
	
			return this.list;
		},
		'setHTML': async function(id) {
			if(this.list.length == 0){
				this.list = await this.loadAPI();
			} else {
				this.list = this.list;
			}
	
			let ReleaseBlockRelated = document.getElementById('ReleaseBlockRelated');
	
			// Заполнение контента связаных релизов
			let FilterTitel = this.list.filter(function(items){
				return items.find(function(element){
					return element == id;
				})
			});
		
			if(FilterTitel.length > 0){
				ReleaseBlockRelated.setAttribute("data-state", "active");
				for (let i = 0; FilterTitel[0].length > i; i++) {
					Card.SmallHovers({
						idDOM: 'ReleaseRelated',
						posters: `${config["webpPosters"]}${FilterTitel[0][i]}.webp`,
						id: FilterTitel[0][i]
					})
				}
			}
		}
	},
	setFranchises: {
		'setHTML': async function(id) {
			let ReleaseBlockRelated = document.getElementById('ReleaseBlockRelated');
	
			// Заполнение контента связаных релизов
			if(Release.list.franchises.length > 0){
				ReleaseBlockRelated.setAttribute("data-state", "active");
				for (let i = 0;Release.list.franchises[0].releases.length > i; i++) {
					Card.SmallHovers({
						idDOM: 'ReleaseRelated',
						posters: `${config["webpPosters"]}${Release.list.franchises[0].releases[i].id}.webp`,
						id: Release.list.franchises[0].releases[i].id
					})
				}
			}
		}
	},
	setRecomend: {
		'list': [],
		'loadAPI': async function () {
			let genres = Release.list.genres;
			let url = config["titels_API"]+'title/search?genres='+genres+'&filter=id,names,posters.medium,player.episodes,type&sort_direction=1&limit=15';
	
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				return data;
			})
			return this.list;
		},
		'setHTML': async function() {
			this.list = await this.loadAPI();
			let json = this.list;
	
			let ReleaseBlockRecomend = document.getElementById('ReleaseBlockRecomend');
			if(json.list.length > 0){
				ReleaseBlockRecomend.setAttribute("data-state", "active");
				
				for (let i = 0; json.list.length > i; i++) {
					let type = () => {
						if(json.list[i].type.code == 0){
							return 'Фильм';
						} else if(json.list[i].type.code == 1){
							return 'Cерия';
						} else if(json.list[i].type.code == 2){
							return 'OVA';
						} else if(json.list[i].type.code == 3){
							return 'ONA';
						} else if(json.list[i].type.code == 4){
							return 'Спешл';
						} else if(json.list[i].type.code == 5){
							return 'WEB';
						} else {
							return 'Cерия';
						}
					}
	
					posters = function () {
						return localStorage.getItem('postersMode') == 'webp'
							? `${config.webpPosters}${json.list[i].id}.webp`
							: `${config.posters}${json.list[i].posters.medium.url}`
					}
	
					Card.SmallHovers({
						idDOM: 'ReleaseRecomend',
						last: json.list[i].player.episodes.last,
						serie: json.list[i].player.episodes.last,
						type: type(),
						posters: posters(),
						id: json.list[i].id
					})
				}
			}
		}
	},
	checkFavorites: {
		'list': [],
		'loadAPI': async function () {
			let PHPSESSID = localStorage.getItem('PHPSESSID');
			let url = config["titels_API"]+`user/favorites?session=${PHPSESSID}&limit=-1`;
	
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				return data;
			})
			return this.list;
		},
		'setHTML': async function(id) {
			this.list = await this.loadAPI();
			let json = this.list;

			let delFavorite = document.getElementById("delFavorite");
			let addFavorite = document.getElementById("addFavorite");

			let FilterTitel = json.list.filter(function(items) {
				return items.id == id;
			});

			if(json.list.indexOf(FilterTitel[0]) > -1){
				delFavorite.setAttribute('data-state', 'active');
				addFavorite.setAttribute('data-state', '');
			} else {
				delFavorite.setAttribute('data-state', '');
				addFavorite.setAttribute('data-state', 'active');
			}

			delFavorite.addEventListener('click', function(){
				Favorites.list = [];

				let url = config["titels_API"]+"user/favorites?session="+localStorage.getItem('PHPSESSID')+"&title_id="+id;
				fetch(url, {
					method: 'DELETE',
				})
				.then((response) => response.json())
				.then((data) => {
					if(styleDebug) console.log('Success:', data);
					Favorites.loadAPI();
				})
				.catch((error) => {
					if(styleDebug) console.error('Error:', error);
				});

				if (localStorage.getItem('WebPushMode') == 'WebPushSubFavorites') push_subscribe_id(id, 'dell');

				delFavorite.setAttribute('data-state', '');
				addFavorite.setAttribute('data-state', 'active');
			})
			addFavorite.addEventListener('click', function(){
				Favorites.list = [];
				let url = config["titels_API"]+"user/favorites?session="+localStorage.getItem('PHPSESSID')+"&title_id="+id;

				fetch(url, {
					method: 'PUT',
				})
				.then((response) => response.json())
				.then((data) => {
					if(styleDebug) console.log('Success:', data);
					Favorites.loadAPI();
				})
				.catch((error) => {
					if(styleDebug) console.error('Error:', error);
				});
			
				if (localStorage.getItem('WebPushMode') == 'WebPushSubFavorites') push_subscribe_id(id, 'save');
				
				delFavorite.setAttribute('data-state', 'active');
				addFavorite.setAttribute('data-state', '');
			})

		}
	},
	checkSubscriptions: async function (id) {
		let delSub = document.getElementById("delSub");
		let addSub = document.getElementById("addSub");

		await fetch('https://push.litelibria.com/my_subscriptions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({'sub_token':localStorage.getItem('sub_token')}),
		})
		.then((response) => response.json())
		.then((data) => {
			if(styleDebug) console.log('My subscriptions:', data);

			if(data.failed == 1) return;

			const even = (element) => element % id === 0;
			if (data.some(even)){
				delSub.setAttribute('data-state', 'active');
				addSub.setAttribute('data-state', '');
			} else {
				delSub.setAttribute('data-state', '');
				addSub.setAttribute('data-state', 'active');
			}
		})

		delSub.addEventListener("click", function(){
			delSub.setAttribute('data-state', '');
			addSub.setAttribute('data-state', 'active');
			push_subscribe_id(id, 'dell');
		})
		addSub.addEventListener("click", function(){
			delSub.setAttribute('data-state', 'active');
			addSub.setAttribute('data-state', '');
			push_subscribe_id(id, 'save');
		})
	},
	loadPlayerJS: function (id){
		// Заполнение контента плейлиста
		PlaySerie.innerHTML = '';
		let playerList = this.list.player.list;
		for(let key in playerList) {
			if(playerList[key]){
				let minutes = "";
				let posterPercent = 0;

				if(historyGet().length != 0){
					if(historyGet('titel', id, key) != -1){
						time = historyGet('titel', id, key).time[0]
						minutes = "<br><span>" + (time / 60).toFixed(2).replace(".", ":") + "</span>";
						posterPercent = historyGet('titel', id, key).time[0] / ( historyGet('titel', id, key).time[1] / 100) + "%"
					}
				}

				poster = () => {
					return playerList[key].preview 
								? config["posters"] + playerList[key].preview
								: config["CustomPosters"] + id + "/" + key + "/1.jpg"
				}

				SerieType = () => {
					let code = this.list.type.code;
					if(code == 0){
						return "Фильм"
					} else if(code == 2){
						return "OVA"
					} else if(code == 3){
						return "ONA"
					} else if(code == 4){
						return "Спешл"
					} else {
						return "Серия"
					}
				}

				let div = document.createElement('div');
				PlaySerie.appendChild(div);
				div.setAttribute('onclick', `releaseHistoryPlay("${id}", "${key}")`)
				div.className = 'posterSerie';
				div.innerHTML += `
					<div class="SerieBlock">
						<div class="posterPercentBlock"><span class="posterPercent" style="width: ${posterPercent}"></span></div>
						<div class="posterSerieNum">
							<center>${SerieType()} ${key}${minutes}</center>
						</div>
						<img src="${poster()}">
					</div>
				`;
			}
		}


		let playlist = () => {
			let dataPlayer = this.list.player;
			var a = [];
			var skips = localStorage.getItem('my_skips_opening');
			for (let key in dataPlayer["list"]) {
				let b = [];

				b['title'] = `Серия ${key}`
				b['poster'] = dataPlayer["list"][key]["preview"] ? config["posters"]+''+dataPlayer["list"][key]["preview"] : config["CustomPosters"] + id + "/" + key + "/1.jpg"
				b['id'] = `${id}s${key}`

				if (dataPlayer["list"][key]["hls"]["sd"]) {
					b['file'] = `[480p]https://${dataPlayer["host"]+dataPlayer["list"][key]["hls"]["sd"]}`;
				}
				if (dataPlayer["list"][key]["hls"]["hd"]) {
					b['file'] += `,[720p]https://${dataPlayer["host"]+dataPlayer["list"][key]["hls"]["hd"]}`;
				}
				if (dataPlayer["list"][key]["hls"]["fhd"]) {
					b['file'] += `,[1080p]https://${dataPlayer["host"]+dataPlayer["list"][key]["hls"]["fhd"]}`;
				}

				if (dataPlayer["list"][key]["skips"]["opening"].length != 0) {
					if (skips == '1') {
						b['start'] = 0
						b['remove'] = dataPlayer["list"][key]["skips"]["opening"][0]+'-'+dataPlayer["list"][key]["skips"]["opening"][1]
					} else {
						b['skip'] = dataPlayer["list"][key]["skips"]["opening"][0]+'-'+dataPlayer["list"][key]["skips"]["opening"][1]
					}
				}
				a.push(b);
			}

			return a;
		}

		let colorTheme = widthAPP <= 800 ? 'var(--ColorThemes1)' : 'var(--ColorThemes2)';

		let engineConfig  = {
			loader: {
				trackerAnnounce: [
					"wss://tracker.litelibria.com",
					"wss://tracker.openwebtorrent.com"
				],
				cachedSegmentsCount: 50, // Количество сегментов видео которое мы храним для раздачи p2p пирам
				cachedSegmentExpiration: 15 * 60 * 1000, // Сколько времени будет хранится сегменты для раздачи p2p пирам
				requiredSegmentsPriority: 9, // Количество сегментов видео которое нужно сразу подгрузить, нужно непрерывного стриминга
				p2pDownloadMaxPriority: 150, // Количество сегментов видео которое мы можем скачать по p2p пирам
				httpDownloadMaxPriority: 1500, // Количество сегментов видео которое мы можем скачать по http
				simultaneousHttpDownloads: 1, // Максимальное количество одновременных загрузок из HTTP-источника
				simultaneousP2PDownloads: 10, // Максимальное количество одновременных загрузок по p2p пирам
				httpDownloadProbabilitySkipIfNoPeers: true, // Не загружать сегменты по HTTP случайным образом, когда нет p2p пиров
			}
		};

		engine = new p2pml.hlsjs.Engine(engineConfig);
		if(p2pMode){
			player = new Playerjs({
				id: "player",
				poster: "../img/player.webp",
				file: "",
				cuid: id,
				bgcolor: colorTheme,
				hlsconfig:{
					liveSyncDurationCount: 7,
					loader: engine.createLoaderClass(),
				}
			});
		} else {
			player = new Playerjs({
				id: "player",
				poster: "../img/player.webp",
				file: "",
				cuid: id,
				bgcolor: colorTheme
			});
		}

		player.api("file", playlist());
		
		if (localStorage.getItem('my_player_style')) {
			var style = localStorage.getItem('my_player_style');
			if (style == '1') {
				player.api("update:nativefullios",1);
			} else if (style == '2') {
				player.api("update:nativefullios",0);
			}
		} else {
			player.api("update:nativefullios",0);
		}
	},
	loadRuTube: function (){
		let series = this.list.player.episodes.last;
		let rutube_playlist = this.list.player.rutube;

		// Функции заполнения контента плейлиста RuTube
		document.getElementById('PlaySerieRuTube').innerHTML = '';
		for(let j = 0; series > j; j++) {
			i = j+1
			var div = document.createElement('div');
			document.getElementById('PlaySerieRuTube').appendChild(div);
			div.setAttribute('onclick', `releaseHistoryPlayRuTube("${rutube_playlist[i]['rutube_id']}")`)
			div.className = 'posterSerie';
			div.innerHTML += `
				<div class="SerieBlock" style="background: var(--ColorThemes3);">
					<div class="posterSerieNum"><center>Серия ${i}</center></div>
					<img src="">
				</div>
			`;
		}

		// Функция смены серии плейлиста RuTube
		function releaseHistoryPlayRuTube(id){
			var player = document.getElementById('PlayerRuTube');
			player.contentWindow.postMessage(JSON.stringify({
				type: 'player:changeVideo',
				data: {
					id: id,
					params: {
						color: 'd53c3c'
					}
				}
			}), '*');
		}
	}
}

// Функция смены серии плейлиста
function releaseHistoryPlay(titel, serie){
	playerID = "id:"+titel+"s"+serie;
	playerTime = '';

	if(historyGet().length != 0){
		if(historyGet('titel', titel, serie) != -1){
			time = historyGet('titel', titel, serie).time[0]
			playerTime = "[seek:"+time+"]";
		}
	}
	player.api("play", playerID+playerTime)
}

// Функции отслеживания событий плеера
function PlayerjsEvents(event,id,info){
	if(event=="stop"){
		if(p2pMode) engine.destroy(); // Разрываем P2P раздачу
	}

	if(event=="init"){
		if(p2pMode){
			initChart(); // Запуск Rickshaw
			initGraph(); // Запуск p2p-graph
			// Отобразить название трекеров
			trackerAnnounce = engine.getSettings().loader.trackerAnnounce;
			if (Array.isArray(trackerAnnounce)) {
				for(var i=0; trackerAnnounce.length > i; i++){
					document.getElementById("trackerAnnounce").innerHTML += `<span>${trackerAnnounce[i]}</span><br /><br />`;
				}
			}
		}
	}

	if(event=="new"){
		if(p2pMode) engine.destroy(); // Разрываем P2P раздачу для прошлого файла
		if(p2pMode) refreshChart(); // Обновление графика Rickshaw
	}

	if(event=="play"){
		if(p2pMode){
			if (p2pml.core.HybridLoader.isSupported()) {
				// Запуск P2P раздачи
				p2pml.hlsjs.initHlsJsPlayer(player.api('hls'));

				// Добавить на p2p-graph нового подключения
				engine.on(p2pml.core.Events.PeerConnect, onPeerConnect.bind());

				// Удалить на p2p-graph отключенного подключения
				engine.on(p2pml.core.Events.PeerClose, onPeerClose.bind());

				// Добавить количество загруженых Байт на график Rickshaw
				engine.on(p2pml.core.Events.PieceBytesDownloaded, onBytesDownloaded.bind());

				// Добавить количество отправленных Байт пирам P2P на график Rickshaw
				engine.on(p2pml.core.Events.PieceBytesUploaded, onBytesUploaded.bind());

				// Вывод в консоль отладочных P2P сообшений
				if(styleDebug) engine.on("segment_loaded", (segment, peerId) => console.log("[P2P] segment_loaded from", peerId ? `peer ${peerId}` : "HTTP", segment));
			}
		}

		// Функция открытия полноэкранного режима в мобильной версии
		var width = document.documentElement.clientWidth;
		if(width <= 800){
			player.api("fullscreen");
		}
	}

	if(event=="pause"){
		releaseHistorySave();
	}

	if(event=="fullscreen"){
		player_navigation('none');
	}

	if(event=="exitfullscreen"){
		player_navigation('flex');
	}

	if(event=="seek"){
		releaseHistorySave();
	}

	if(event=="time"){
		console.log(info);
		// if(Math.round(info) % 10 === 0){
		// 	releaseHistorySave();
		// }
	}
}

// Функция сохранения истории Приложения
function releaseHistorySave(){
	let playlistID = player.api("playlist_id").split('s');

	let titel = playlistID[0];
	let serie = playlistID[1];
	let time = player.api("time");
	let duration = player.api("duration");
	let date = Date.now();

	historySave(titel, serie, time, duration, date, playerName, playerLength);
}

// Функция скрытия элементов интерфейса в полноэкранном режиме
function player_navigation(display){
	if(display == "none"){
		document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]').setAttribute("content", "#000000");
		document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]').setAttribute("content", "#000000");

		document.getElementById('navi').style.display = 'none';
		document.getElementById('backToTop').style.display = 'none';
		document.body.setAttribute("style", "touch-action: none;-ms-touch-action: none;");
	}
	if(display == "flex"){
		if (localStorage.getItem('my_theme') == 'theme1') {
			document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]').setAttribute("content", "#fbfbfb");
			document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]').setAttribute("content", "#fbfbfb");
		} else if(localStorage.getItem('my_theme') == 'theme2') {
			document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]').setAttribute("content", "#1c1c19");
			document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]').setAttribute("content", "#1c1c19");
		} else {
			document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]').setAttribute("content", "#fbfbfb");
			document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]').setAttribute("content", "#1c1c19");
		}
		
		document.getElementById('navi').style.display = '';
		document.getElementById('backToTop').style.display = '';
		document.body.setAttribute("style", "");
	}
}