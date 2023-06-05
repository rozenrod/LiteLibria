let app = document.getElementById('app');

// Конфигурация роутера
Router.config({ mode: 'history'});



// Функция загрузки приложения
window.addEventListener('load', async function () {
	if(styleDebug) console.log('2. Получаем облачную историю приложения');
	if(localStorage.getItem('CloudSync') == 'true') await Cloud.init();



	if(styleDebug) console.log('3. Получаем ширину приложения');
	appWidth(widthAPP);
	if(styleDebug) console.log('[Width APP] ', widthAPP, 'px');



	if(styleDebug) console.log('4. Проверяем ОС устройства');
	if(styleDebug) console.log('[OS] ', detectOS());
	if (window.matchMedia('(display-mode: standalone)').matches) {
		if (detectOS() == 'Android') {
			document.getElementById('navigation_block').dataset.state = '';
		} else if (detectOS() == 'iOS') {
			document.getElementById('navigation_block').dataset.state = 'iOS';
			localStorage.setItem('backToTop', 'false');
		} else if (detectOS() == 'MacOS') {
			document.getElementById('navigation_block').dataset.state = 'iOS';
			localStorage.setItem('backToTop', 'false');
		} else {
			document.getElementById('navigation_block').dataset.state = '';
		}
  }



	if(styleDebug) console.log('5. Проверяем выбранный режим постеров');
	if(!localStorage.getItem('postersMode')) localStorage.setItem('postersMode', 'webp')
	if(styleDebug) console.log('[Posters Mode] ', localStorage.getItem('postersMode'));



	if(styleDebug) console.log('6. Проверка версии приложения');
	if(localStorage.getItem('appVersion') !== config.version){
		Popup.update();
		localStorage.setItem('appVersion', config.version);
	}
	if(styleDebug) console.log('[appVersion]', localStorage.getItem('appVersion'));


	if(styleDebug) console.log('7. Получаем адрес страницы и запросы query');
	Router.check().listen();



	if(styleDebug) console.log('8. Запуск функции WebSocket');
	WebSocketStatusEpisode();



	if(styleDebug) console.log('9. Запрос PublicKey');
	await GetPublicKey();



	if(styleDebug) console.log('10. Запрос ScrollToTop');
	ScrollToTop.init();



	if(styleDebug) console.log('11. Предзагрузка всех API');

	Home.updates.loadAPI();
	Home.genres.loadAPI();
	Home.schedule.loadAPI();
	Home.video.loadAPI();
	Home.recomend.loadAPI();
	Home.announce.loadAPI();
	Home.NEWS.loadAPI();
	Catalog.loadAPI();
	Schedule.loadAPI();
	Favorites.loadAPI();
	Option.account.loadAPI();
	Search.getStorage();

	// if(localStorage.getItem('G_SyncMode') == 'true') handleAuthClick();

	if(styleDebug) console.log('12. Обнуление Badge');
	clearBadge();
});



// Функция изменения размера приложения
window.addEventListener("resize", function() {
	widthAPP = document.documentElement.clientWidth;
	appWidth(widthAPP);
}, false);




// Функция выбора страници в меню
function menuPageActive(page){
	document.getElementById('b_page_home').setAttribute("data-state", page === 'home' ? "active" : "");
	document.getElementById('b_page_catalog').setAttribute("data-state", page === 'catalog' ? "active" : "");
	document.getElementById('b_page_favorites').setAttribute("data-state", page === 'favorites' ? "active" : "");
	document.getElementById('b_page_search').setAttribute("data-state", page === 'search' ? "active" : "");
	document.getElementById('b_page_options').setAttribute("data-state", page === 'options' ? "active" : "");

	if(player) player.api("stop");
	playerPlay = false;

	pageAPP = page

	clearTimeout(releaseSyncTimeoutId);

	// if (!history.state) return;
	// if(window.scrollY >= 0) window.scroll(0, history.state.position);
}



function appWidth(width = widthAPP) {
  let tallage = 95;
  let result = width / 100 * tallage;
  if (width <= 800) {
    app.style.width = "100%";
  } else {
    app.style.width = result+"px";
  }
}


let updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', function(){
	appReload();
})


function appReload(){
	clearTimeout(releaseSyncTimeoutId);

	// Переменные запросов API
	Home.updates.list = [];
	Home.genres.list = [];
	Home.schedule.list = [];
	Home.video.list = [];
	Home.recomend.list = [];
	Home.announce.list = [];
	Home.NEWS.list = [];

	Schedule.list = [];

	Catalog.list = [];
	Catalog.after = 0;

	Favorites.list = [];

	Option.account.list = [];

	Home.updates.loadAPI();
	Home.genres.loadAPI();
	Home.schedule.loadAPI();
	Home.video.loadAPI();
	Home.recomend.loadAPI();
	Home.announce.loadAPI();
	Home.NEWS.loadAPI();
	Catalog.loadAPI();
	Schedule.loadAPI();
	Favorites.loadAPI();
	Option.account.loadAPI();

	if(localStorage.getItem('CloudSync') == 'true') Cloud.load();

	console.log(window.location.pathname);

	Router.navigate(window.location.pathname, false).check();

	// Закрытие старого соединения WebSocket
	socket.close(1000, "Перезапуск соединения");

	// Открытие нового соединения WebSocket
	WebSocketStatusEpisode();

	// Обнуление Badge
	clearBadge();
}



// Проверка того, что наш браузер поддерживает Service Worker API.
if ('serviceWorker' in navigator) {
	// Отображать уведомление, когда доступно новое обновление
	var presentUpdateAvailable = serviceWorker => {
		document.getElementById('update-banner-1').dataset.state = 'updateavailable';
		document.querySelector('#update-banner-1 .headline').innerHTML = 'Доступно обновление';
		document.querySelector('#update-banner-1 .subhead').innerHTML = 'Нажмите, чтобы обновить приложение до последней версии!';
		document.getElementById('update-banner-1').addEventListener('click', clickEvent => {
			document.getElementById('update-banner-1-icon').style.display = "block";
			document.querySelector('#update-banner-1 .headline').innerHTML = '';
			document.querySelector('#update-banner-1 .subhead').innerHTML = '';
			serviceWorker.postMessage('skipWaiting');
		});

		document.getElementById('update-banner-2').dataset.state = 'updateavailable';
		document.querySelector('#update-banner-2 .headline').innerHTML = 'Доступно обновление';
		document.querySelector('#update-banner-2 .subhead').innerHTML = 'Нажмите, чтобы обновить приложение до последней версии!';
		document.getElementById('update-banner-2').addEventListener('click', clickEvent => {
			document.getElementById('update-banner-2-icon').style.display = "block";
			document.querySelector('#update-banner-2 .headline').innerHTML = '';
			document.querySelector('#update-banner-2 .subhead').innerHTML = '';
			serviceWorker.postMessage('skipWaiting');
		});
	}

	// Регистрация Service Worker
	navigator.serviceWorker.register('/sw.js')
	.then(registration => {
		// Отображение уведомления, если обновление ожидает установки
		if (registration.waiting) presentUpdateAvailable(registration.waiting);

		// Мы ждем UpdateFoundEvent, который запускается каждый раз, когда приобретается новый Service Worker.
		registration.onupdatefound = updatefoundevent => {
			// Игнорировать событие, если это наш первый Service Worker и, следовательно, не обновление.
			if (!registration.active) return;

			// Слушаем любые изменения состояния нового воркера.
			registration.installing.addEventListener('statechange', statechangeevent => {
					if (statechangeevent.target.state !== 'installed') return;
					presentUpdateAvailable(registration.waiting);
			});
		};

		if ('PushManager' in window) {
			swRegistration = registration;
			initializeUI();
		} else {
			if(styleDebug) console.warn('Push meapplicationServerPublicKeyssaging is not supported');
			updateBtn();
		}

		// Мы ждем ControllerEvent, который запускается, когда документ получает новый Service Worker.
		navigator.serviceWorker.addEventListener('controllerchange', controllerchangeevent => {

				// Ждём новый Service Worker
				controllerchangeevent.target.ready.then(registration => {
					setTimeout(function(){
						// Перезагружаем страницу
						if (!window.isReloading) {
							window.isReloading = true;
							window.location.reload();
						}
					}, 100)
				});
		});
	});
}