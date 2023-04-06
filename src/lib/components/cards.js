const Card = {
	MediumHovers: ({idDOM, last, serie, posters, name, genres, description, id}) => {
		let div = document.createElement('div');
		document.getElementById(idDOM).appendChild(div);
		div.className = 'LineCard-MediumHovers';
		div.innerHTML += `
			<div class="LineCard-TextSerie" ${!last ? 'style="display: none;"' : ''}>${serie}</div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"/></svg>
			<img src="${posters}" alt="">
			<div class="LineCard-Hover">
				<p class="LineCard-Hover-Name" style="-webkit-box-orient: vertical;">${name}</p>
				<p class="LineCard-Hover-Genres" style="-webkit-box-orient: vertical;">${genres}</p>
				<p class="LineCard-Hover-Description" style="-webkit-box-orient: vertical;">${description}</p>
			</div>
			<a data-route class="LineCard-Click" href="/release/${id}"></a>
		`;
	},

	SmallHovers: ({idDOM, last, serie, type, posters, id, minutes = false}) => {
		let div = document.createElement('div');
		document.getElementById(idDOM).appendChild(div);
		div.className = 'LineCard-SmallHovers';

		if(type == null) type = '';
		if(serie == null) serie = '';
		if(last == null) last = 0;
		lastSerie = () => {
			if(last > serie) return `${serie} из ${last}`;
			else return last;
		}
		text = () => {
			if(minutes) return `
				<p class="LineCard-Hover-Serie">Серия ${serie}</p>
				<p class="LineCard-Hover-Serie">Минута ${minutes}</p>
			`;
			return `<p class="LineCard-Hover-Serie">${type} ${serie}</p>`;
		};

		let serie_loading = () => {
			if(last === 0){
				return `<div id="Schedule-${id}"></div>`
			} else {
				return `<div class="LineCard-Hover-SerieUnwatched" style="z-index: 2;"><span>${lastSerie()}</span></div>`
			}
		}

		div.innerHTML += `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"/></svg>
			<img src="${posters}" alt="">
			<div class="LineCard-Hover">
				${text()}
			</div>
			${serie_loading()}
			<a data-route class="LineCard-Click" href="/release/${id}"></a>
		`;
	},

	LongHovers: ({idDOM, last, posters, name, genres, description, id}) => {
		let div = document.createElement('div');
		document.getElementById(idDOM).appendChild(div);
		let Episode = last > 0 ? `<span class="LineCard-LongHovers-Left-Episode">${last}</span>` : ''
		div.className = 'LineCard-LongHovers';
		div.innerHTML += `
			<div class="LineCard-LongHovers-Left">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg>
				<img src="${posters}" alt="">
				${Episode}
			</div>
			<div class="LineCard-LongHovers-Right">
				<p class="LineCard-LongHovers-Name" style="-webkit-box-orient: vertical;">${name}</p>
				<p class="LineCard-LongHovers-Genres" style="-webkit-box-orient: vertical;">${genres}</p>
				<p class="LineCard-LongHovers-Description" style="-webkit-box-orient: vertical;">${description}</p>
			</div>
			<a data-route class="LineCard-Click" href="/release/${id}"></a>
		`;
	},

	BigHovers: ({idDOM, posters, name, genres, description, id, youtube = false}) => {
		if(youtube) href = `https://www.youtube.com/watch?v=${id}`;
		else href = `/release/${id}`;

		let div = document.createElement('div');
		document.getElementById(idDOM).appendChild(div);
		div.className = 'LineCard-BigHovers';
		div.innerHTML += `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"/></svg>
			<img src="${posters}" alt="">
			<div class="LineCard-Hover">
				<p class="LineCard-Hover-Name" style="-webkit-box-orient: vertical;">${name}</p>
				<p class="LineCard-Hover-Genres" style="-webkit-box-orient: vertical;">${genres}</p>
				<p class="LineCard-Hover-Description" style="-webkit-box-orient: vertical;">${description}</p>
			</div>
			<a ${youtube ? '' : 'data-route'} class="LineCard-Click" href="${href}"></a>
		`;
	},

	GenresCard: ({idDOM, id, a, b, c, d, alfa}) => {
		let div = document.createElement('div');
		document.getElementById(idDOM).appendChild(div);
		div.innerHTML += `
			<div class="GenresCard">
				<img src="img/genres/${id}.webp" alt="">
				<div class="GenresCardBG" style="background-image: linear-gradient(90deg, ${a}${alfa}, ${b}${alfa}, ${c}${alfa}">
					<span>${id}</span>
				</div>
				<a class="LineCard-Click" href="/catalog?genres=${id}" data-route></a>
			</div>
		`;
	},

	HistoryCard: ({idDOM, id, title, text, posters, date = false}) => {
		let div = document.createElement('div');
		dateText = () => {
			if(date) return `<p class="LineCard-History-Text">${date}</p>`;
			else return ''
		}
		document.getElementById(idDOM).appendChild(div);
		div.className = 'LineCard-History';
		div.innerHTML += `
			<img src="${posters}" alt="">
			<div class="LineCard-History-BlockText">
				<p class="LineCard-History-Title">${title}</p>
				<p class="LineCard-History-Text">${text}</p>
				${dateText()}
			</div>
			<a class="LineCard-Click" href="/release/${id}" data-route></a>
		`;
	}
}