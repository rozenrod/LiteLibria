
// historySave(9182, 1, 10, 1470.010877999999, 5) // Сохранить в историю Приложения вручную

// historyConvert() // Запуск конвертации всей истории Приложения в историю PlayerJS
// historyConvert(9182, 1) // Запуск конвертации серии тайтла из истории Приложения в историю PlayerJS

// historyDell(9182) // Удалить релиз из Истории Приложения
// historyDell(9182, 2) // Удалить серию релиза из Истории Приложения

// historyGet(); // Получение отфильтрованной истории Приложения
// getUniqueElems(historyGet()); // Получение последнего просмотра релиза из истории Приложения


// Сохранить историю PlayerJS в историю Приложения
function historyLoad(){
	let keys = Object.keys(localStorage);
  for(let key of keys) {
    if (key.substring(0, 12) == "pljsplayfrom") {
			historySave(
				ParsePlayerStorage(localStorage.getItem(key), 'id'), 
				ParsePlayerStorage(localStorage.getItem(key), 'seria'), 
				ParsePlayerStorage(localStorage.getItem(key), 'time'), 
				ParsePlayerStorage(localStorage.getItem(key), 'timeOld'), 
				ParsePlayerStorage(localStorage.getItem(key), 'date')
			)
    }
  }
}



// Функция добавления или изменения нового объекта в истории
function historySave(id, serie, time1, time2, date, name, serieLength){
	var history = [];
	if(localStorage.getItem("history")){
		history = JSON.parse(localStorage.getItem("history"))
	}

	// Проверка совпадения.
	var result = history.some(element => {
		if(element.id == id && element.serie == serie){
			return element;
		}
	});

	// Если релиз уже есть в истории, то обновляем его.
	// Когда релиза нет в истории, то сохраняем как новый.
	if(result == true){
		history.forEach((element, index) => {
			if(element.id == id && element.serie == serie){
				history[index] = {"id": id, "serie": serie, "time": [time1, time2], "date": date, "name": name, "serieLength": serieLength};
				localStorage.setItem("history", JSON.stringify(history))
				saveConfig(history)
				return;
			}
		});
	} else {
		history.push({"id": id, "serie": serie, "time": [time1, time2], "date": date, "name": name, "serieLength": serieLength});
		saveConfig(history)
		localStorage.setItem("history", JSON.stringify(history))
	}
}


// Функция удаления релиза из истории
function historyDell(titel, serie = null){
	var history = [];
	if(localStorage.getItem("history")){
		history = JSON.parse(localStorage.getItem("history"))
		if(serie != null){
			var FilterTitel = history.filter(function(items) {
				return items.id == titel && items.serie == serie;
			});
			if(history.indexOf(FilterTitel[0]) > -1){
				history.splice(history.indexOf(FilterTitel[0]), 1)
			}
		} else {
			for (let i = 0; i < history.length; i++) {
				var FilterTitel = history.filter(function(items) {
					return items.id == titel;
				});

				if(history.indexOf(FilterTitel[0]) > -1){
					history.splice(history.indexOf(FilterTitel[0]), 1)
				}
			}
		}
		localStorage.setItem('history', JSON.stringify(history));

		var idItem = 'pljsplayfrom_' + config['domains'] + titel;
		localStorage.removeItem(idItem);
		historyConvert();
	}
}


// Функция получения отсортированной истории Приложения
function historyGet(sort = null, titel = null, serie = null){
	var history = [];
	if(localStorage.getItem("history")){
		history = JSON.parse(localStorage.getItem("history"))
		
		if(sort == 'date'){
			// Сортируем историю по времени
			history.sort(function(a, b) {
				if (a.date > b.date)
						return -1;
				if (a.date < b.date) 
						return 1;     
				return 0;
			});
		} else if(sort == 'titel' && titel != null && serie != null) {
			var FilterTitel = history.filter(function(items) {
				return items.id == titel && items.serie == serie;
			});
			if(FilterTitel.length > 0) {
				return FilterTitel[0];
			} else {
				return -1;
			}
		} else {	
			// Сортируем историю по времени и ID
			history.sort(function(a, b) {  
				if (a.id > b.id)
						return -1;
				if (a.id < b.id) 
						return 1;	
				if (a.date < b.date)
						return -1;
				if (a.date > b.date) 
						return 1;   	
				return 0;
			});
		}
	} else {
		localStorage.setItem("history", '')
	}
	return history;
}


// Функция конвертации истории Приложения в историю PlayerJS
function historyConvert(titel = null, serie = null){
	var history = historyGet();
	if(history){
		// Если нет запроса релиза, то сохраняем в хранилище все последние просмотры из истории Приложения в формате PlayerJS
		if(titel == null || serie == null){
			var UniqueTitle = getUniqueElems(history);
			for (let i = 0; i < UniqueTitle.length; i++) {
				var idItem = 'pljsplayfrom_' + config['domains'] + UniqueTitle[i].id;
				var stringItem = "{x-"+ (UniqueTitle[i].serie-1) +"-"+ UniqueTitle[i].id +"s"+ UniqueTitle[i].serie +"}"+ UniqueTitle[i].time[0] +"--"+ UniqueTitle[i].time[1] +"--"+ UniqueTitle[i].date;
				localStorage.setItem(idItem, stringItem)
			}
		} else {
			var FilterTitel = history.filter(function(items) {
				return items.id == titel && items.serie == serie;
			});

			var idItem = 'pljsplayfrom_' + config['domains'] + FilterTitel[0].id;
			var stringItem = "{x-"+ (FilterTitel[0].serie-1) +"-"+ FilterTitel[0].id +"s"+ FilterTitel[0].serie +"}"+ FilterTitel[0].time[0] +"--"+ FilterTitel[0].time[1] +"--"+ FilterTitel[0].date;
			localStorage.setItem(idItem, stringItem)
		}
	}
}




// Вспомогательная функция разбора строки истории PlayerJS 
function ParsePlayerStorage(x, comand) {
	var	v = '';
	var x_seria_bit = '';
	var x_id = '';
	var x_seria = '';
	var x_time = 0;
	var x_time_old = 0;
	var x_date = 0;

	if (x.indexOf("{") == 0) {
		v = x.substr(1, x.indexOf("}") - 1)
		x = x.substr(x.indexOf("}") + 1);
	}
	if (v) {
		if (v.indexOf("-") > 0) {
			var q = v.split("-");
			var qs = v.split("s");
			x_seria_bit = parseFloat(q[1]);
			x_id = parseFloat(q[2]);
			x_seria = parseFloat(qs[1]);
		}
	}
	if (x) {
		if (x.indexOf("--") > 0) {
				var y = x.split("--");
				x_time = parseFloat(y[0]);
				x_time_old = parseFloat(y[1]);
				x_date = parseFloat(y[2]);
		}
	}
	switch (comand) {
		case "seriaBit":
			return x_seria_bit;
			break;
		case "id":
			return x_id;
			break;
		case "seria":
			return x_seria;
			break;
		case "time":
			return x_time;
			break;
		case "timeOld":
			return x_time_old;
			break;
		case "date":
			return x_date;
			break;
	}
}


// Вспомогательная функция вывода последнего просмотра по времени 
function getUniqueElems(A){   
	var n;
	var B = [];
	if(A != null){
		n = A.length
	}
	for (var i = 1, j = 0, t; i < n+1; i++){ 
		if(i != n){
			if (A[i-1].id == A[i].id){
				t = A[i-1];
			}
		} else {
			t = A[n];
		}
		if (A[i-1] !== t){
			B[j++] = A[i-1];
		}
	}
	return B;
}