function loadNameHistory(titel, serie, time, duration, date){
	var url = config["titels_API"]+'title?id='+titel+'&filter=id,names.ru,type.episodes';
	fetch(url)
	.then(function (response) {
		if (response.status !== 200) {
			return Promise.reject(new Error(response.statusText))
		}
		return Promise.resolve(response)
	})
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		historySave(titel, serie, time, duration, date, data.names.ru, data.type.episodes)
	})
	.catch(function (error) {
		console.log('error', error)
	})
}