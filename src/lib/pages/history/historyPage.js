const History = {
	list: [],
	init: async function() {
		// let html = await fetch('/lib/pages/history/index.html').then((response) => response.text());
		let html = `<div class="SortingBlock"><div class="SortingBlockForm"><span class="SortingContainer"><select class="SortingChosen" id="SortingOrderBy"><option value="date">Дате</option><option value="release">Релизу</option></select><label class="SortingCheckboxContainer"><input type="checkbox" checked="checked" id="SortingChecUpTop"><span class="SortingCheckmark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"/></svg></span></label></span><button class="SortingButton" id="ClearSortingHistory">Сбросить</button></div></div><div class="HistoryBlock"><div class="HistoryList"><div style="display:flow-root"><h1 style="float:left">История просмотров</h1><h3 style="float:right" id="CloudMess" title="Время последней синхронизации"></h3></div><div id="HistoryGenerator"><div id="FilterNone"><img src="img/libriatyan/4.webp"><br><br><p style="color:var(--ColorThemes3)">Пока пусто...</p></div></div></div></div>`;
		app.innerHTML = html;

		await this.getHistory();
		await this.setHTML();

		document.title = 'История — LiteLibria';
		preloaderHide();

		let ClearSortingHistory = document.getElementById("ClearSortingHistory");
		let CloudMess = document.getElementById("CloudMess");

		if(localStorage.getItem('CloudSync') == 'true') CloudMess.innerText = timeConverter(await Cloud.list.updated)

		let SortingOrderBy = document.querySelector("#SortingOrderBy")
		let SortingChecUpTop = document.querySelector("#SortingChecUpTop")

		ClearSortingHistory.addEventListener("click", async function() {
			History.list = [];
			SortingOrderBy.value = "date"
			SortingChecUpTop.checked=true
			
			document.getElementById('HistoryGenerator').innerHTML = ``;
			await History.getHistory();
			await History.setHTML();
		});

		SortingOrderBy.addEventListener('change', function (e) {
			SortingHistory()
		});
		SortingChecUpTop.addEventListener('click', function (e) {
			SortingHistory()
		});

	},
	getHistory: async function() {
		History.list = await historyGet('date');
	},
	setHTML: async function() {
		HistoryList = History.list;

		if(HistoryList.length > 0){
			var idH = [];

			for (let i = 0; i < HistoryList.length; i++) {
				idH.push(HistoryList[i].id); 
				var minutes = (HistoryList[i].time[0] / 60).toFixed(2).replace(".", ":");
				var dateObject = new Date(HistoryList[i].date);
				var date = dateObject.toLocaleString()

				var div = document.createElement('div');
				document.getElementById('HistoryGenerator').appendChild(div);
				div.className = 'HistoryCard';
				div.id = 'article_history'+HistoryList[i].id+"-"+HistoryList[i].serie;

				if(HistoryList[i].name == undefined ){
					loadNameHistory(HistoryList[i].id, HistoryList[i].serie, HistoryList[i].time[0], HistoryList[i].time[1], HistoryList[i].date)
				}
				// if(HistoryList[i].serieLength == undefined ){
				// 	loadNameHistory(HistoryList[i].id, HistoryList[i].serie, HistoryList[i].time[0], HistoryList[i].time[1], HistoryList[i].date)
				// }

				div.innerHTML = `
					<img src="${config["webpPosters"]}${HistoryList[i].id}.webp" alt="">
					<div class="HistoryCard-BlockText">
						<p class="HistoryCard-Title">${HistoryList[i].name}</p>
						<p class="HistoryCard-Text">Серия ${HistoryList[i].serie}   Минута ${minutes}</p>
						<p class="HistoryCard-Text">Дата ${date}</p>
						<a class="HistoryCard-Open" href="/release/${HistoryList[i].id}" data-route>Открыть</a>
						<p class="HistoryCard-Del" onclick="myHistoryDell('${HistoryList[i].id}', '${HistoryList[i].serie}')">Удалить</p>
					</div>
				`;
			}
		}
	}
}

// Функции удаления релиза
function myHistoryDell(title, serie){
	document.getElementById('article_history'+title+"-"+serie).setAttribute("style", "display:none;");
	historyDell(title, serie);
	
	HistoryList = historyGet('date');
	if(HistoryList.length <= 0){
		document.getElementById("HistoryNone").style.display = "block";
	}
}

// Функция сортировки
function SortingHistory(){
  let orderBy_sort = document.getElementById("SortingOrderBy").value;

	let checkbox_sorting = '0';
  if (document.querySelector('#SortingChecUpTop:checked')) {
     checkbox_sorting = '1';
  }

	document.getElementById('HistoryGenerator').innerHTML = '';
	HistoryList = historyGet();

	if(orderBy_sort == 'date'){
		HistoryList.sort(function(a, b) {
			if(checkbox_sorting == 1){
				if (a.date > b.date)
				return -1;
				if (a.date < b.date)
						return 1;
				return 0;
			} else {
				if (a.date < b.date)
				return -1;
				if (a.date > b.date)
						return 1;
				return 0;
			}
		});
	} else {
		HistoryList.sort(function(a, b) {
			if(checkbox_sorting == 1){
				if (a.id > b.id)
					return -1;
				if (a.id < b.id)
						return 1;
				return 0;
			} else {
				if (a.id < b.id)
					return -1;
				if (a.id > b.id)
						return 1;
				return 0;
			}
		});
	}

	History.list = HistoryList;

	History.setHTML();
}