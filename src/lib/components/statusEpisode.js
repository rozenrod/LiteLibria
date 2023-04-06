// Функции отслеживания состояния релизов на сервере.
function loadAPIStatusEpisode(){
	var url = config["statusEpisode"]+"episodes";
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
		StatusEpisode = data;
		GeneratorStatusEpisode();
  })
  .catch(function (error) {
    console.log('error', error)
  })
}
function GeneratorStatusEpisode() {
	for (let i = 0; i < StatusEpisode.length; i++) {
		if (document.getElementById('Schedule-'+StatusEpisode[i].id) !== null) {
      document.getElementById('Schedule-'+StatusEpisode[i].id).innerHTML = '';

			if(StatusEpisode[i].status == 'finish'){
				var div = document.createElement('div');
        div.className = 'LineCard-Hover-SerieUnwatched';
				document.getElementById('Schedule-'+StatusEpisode[i].id).appendChild(div);

				div.title = 'Серия загружена на сервер.';

				div.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z"/></svg>
        `;
			} else if(StatusEpisode[i].status == 'encode'){
				var div = document.createElement('div');
        var statusText = '';
        div.className = 'LineCard-Hover-SerieUnwatched';
        div.style.backgroundColor = 'var(--ColorThemes3)';
				document.getElementById('Schedule-'+StatusEpisode[i].id).appendChild(div);

        if(StatusEpisode[i].resolution  && StatusEpisode[i].encoded_percent) {
					div.title = `Серия загружается на сервер. Процесс: ${StatusEpisode[i].resolution} - ${StatusEpisode[i].encoded_percent}%`;
          statusText = `<span style="margin-left: 10px;color:var(--ColorThemes1);">${StatusEpisode[i].encoded_percent}%</span>`
        } else if(StatusEpisode[i].isReupload == true) {
          div.title = `Перезалив серии на сервер. Процесс: ${StatusEpisode[i].resolution} - ${StatusEpisode[i].encoded_percent}%`;
          statusText = `<span style="margin-left: 10px;color:var(--ColorThemes1);">${StatusEpisode[i].encoded_percent}%</span>`
        } else {
          div.title = `Серия загружается на сервер.`;
        }

				div.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 22px;"><path d="M 6 2 C 4.895 2 4 2.895 4 4 L 4 6 C 4 6.552 4.448 7 5 7 L 19 7 C 19.552 7 20 6.552 20 6 L 20 4 C 20 2.895 19.105 2 18 2 L 6 2 z M 5 9 C 4.448 9 4 9.448 4 10 L 4 14 C 4 14.552 4.448 15 5 15 L 15.171875 15 L 17.402344 12.769531 C 17.895344 12.276531 18.563719 12 19.261719 12 L 20 12 L 20 10 C 20 9.448 19.552 9 19 9 L 5 9 z M 19 14 C 18.77975 14 18.560578 14.083953 18.392578 14.251953 L 15.734375 16.910156 C 15.331375 17.313156 15.615594 18 16.183594 18 L 18 18 L 18 23 A 1.0001 1.0001 0 1 0 20 23 L 20 18 L 21.814453 18 C 22.383453 18 22.669578 17.313156 22.267578 16.910156 L 19.609375 14.251953 C 19.441375 14.083953 19.22025 14 19 14 z M 5 17.001953 C 4.448 17.001953 4 17.449953 4 18.001953 L 4 20.001953 C 4 21.106953 4.895 22.001953 6 22.001953 L 16 22.001953 L 16 20.001953 C 15.937 20.001953 15.883219 19.982609 15.824219 19.974609 L 15.751953 19.962891 C 15.681953 19.949891 15.610875 19.939016 15.546875 19.916016 C 14.746875 19.718016 14.072094 19.157094 13.746094 18.371094 C 13.562094 17.926094 13.513172 17.455953 13.576172 17.001953 L 5 17.001953 z"/></svg>
          ${statusText}
        `;
			}
		}
	}
}