const Option = {
	init: async function() {
		// let html = await fetch('/lib/pages/option/index.html').then((response) => response.text());
		let html = `<div class="OptionsBlock"><div class="OptionsBlockCard" id="profile" data-state=""><div class="OptionsAccount"><div class="OptionsAccountLogo" id="my_profile_img"></div><div class="OptionsAccountText"><p class="OptionsAccountTextProfile">Логин:<span id="my_login"></span></p><p class="OptionsAccountTextProfile">Ник:<span id="my_nickname"></span></p><p class="OptionsAccountTextProfile">Почта:<span id="my_email"></span></p><p class="OptionsAccountTextProfile">ВК ID:<span id="my_vk_id"></span></p><p class="OptionsAccountTextProfile">Patreon ID:<span id="my_patreon_id"></span></p><br><p class="settings_filter_p">*LiteLibria не собирает никаких личных данных о вас, они хранятся только на вашем устройстве!</p><button id="logout">Выйти из аккаунта</button></div></div></div><div class="OptionsBlockCard" id="auth" data-state="deactivated"><div class="OptionsCard"><h3>Авторизация</h3><br><div id="form_login" class="formMirror"><p id="error_mes" style="display:none">Неверный логин или пароль!</p><br><div class="blockMirror"><label>Логин</label><input required type="text" name="mail" class="MirrorBox"></div><br><div class="blockMirror"><label>Пароль</label><input required type="password" name="pwd" class="MirrorBox"></div><br><button id="login">Вход</button></div><p class="settings_filter_p">*LiteLibria не собирает никаких личных данных о вас, они хранятся только на вашем устройстве!</p><p class="settings_filter_p">*Регистрация доступна на сайте<a href="https://www.anilibria.tv/"> AniLibria.TV</a>!</p></div></div><div class="OptionsBlockCard"><div class="OptionsCard"><span class="OptionsTitle"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><path d="M103.14681,7.16667c-1.39872,0.02045 -2.73437,0.58534 -3.72331,1.57471l-36.05729,36.05729c-0.30722,0.19896 -0.59332,0.42877 -0.85384,0.68587l-19.41439,19.40739c-1.80988,1.80884 -2.09386,4.64274 -0.67887,6.77474c0,0 3.69072,5.58427 6.56478,11.71582c1.43703,3.06578 2.62566,6.27045 3.05843,8.55241c0.42518,2.24198 -0.08295,2.76186 0.31494,2.36556c-0.4284,0.33902 -8.56943,6.78581 -17.99365,14.41732c-9.6686,7.8294 -19.89238,16.18035 -24.01953,20.30322c-8.96782,8.96782 -8.96782,23.66711 0,32.63493c8.96639,8.96639 23.65971,8.96353 32.62793,0c4.13345,-4.12917 12.48671,-14.34367 20.31722,-24.01253c7.63264,-9.42454 14.07835,-17.57229 14.41732,-18.00065c0.14452,-0.13721 0.73846,-0.49135 2.92545,-0.11898c2.21833,0.3777 5.32437,1.55258 8.27946,3.03044c2.95509,1.47785 5.80175,3.22557 7.87354,4.58415c1.03589,0.67929 1.88041,1.25864 2.45654,1.66569c0.28807,0.20354 0.50668,0.36392 0.65088,0.46892c0.0607,0.04422 0.1008,0.07426 0.13297,0.09798c0.00609,0.0043 0.02298,0.01041 0.028,0.014c0.01626,0.01176 0.0326,0.02342 0.04899,0.03499c0.92644,0.68975 2.0504,1.06277 3.2054,1.0638c0,0 0.32555,-1.01309 0.42692,-1.32275l3.37337,-0.24496l19.41439,-19.41439c0.27854,-0.28222 0.52499,-0.5944 0.73486,-0.93083l35.97331,-35.9943c2.09823,-2.0991 2.09823,-5.50149 0,-7.60059l-56.20654,-56.23454c-1.02666,-1.02708 -2.42521,-1.59508 -3.87728,-1.57471zM100.65527,39.85059c0.91689,0 1.83478,0.34926 2.53353,1.0498c1.40108,1.40109 1.40108,3.66956 0,5.06706c-3.49733,3.49733 -3.49733,9.17372 0,12.67464c3.49733,3.49733 9.16673,3.49733 12.66764,0l1.27376,-1.26676c2.79858,-2.79858 7.33553,-2.79858 10.13411,0c2.79858,2.79858 2.79858,7.33553 0,10.13411l-2.53353,2.53353c-4.19967,4.19967 -4.19967,11.0015 0,15.20117c2.07481,2.07481 4.78438,3.11769 7.5026,3.14242l-9.60921,9.61621l-48.62695,-48.63395l8.25846,-8.25847c0.27577,1.31564 0.91008,2.57577 1.93164,3.59733c2.79858,2.79859 7.33553,2.79859 10.13411,0l3.80029,-3.80729c0.70054,-0.70054 1.61665,-1.0498 2.53353,-1.0498zM66.38965,56.9764l48.62695,48.62695l-2.19059,2.19759c-0.27812,0.28004 -0.52456,0.58985 -0.73486,0.92383l-9.41325,9.42025h-0.007c-2.31172,-1.51576 -5.45623,-3.45212 -8.95134,-5.20003c-3.49715,-1.74894 -7.29692,-3.34576 -11.2819,-4.02425c-3.98497,-0.67849 -8.86933,-0.38294 -12.3737,3.12142c-0.14641,0.1459 -0.28428,0.30013 -0.41292,0.46191c0,0 -6.9274,8.76032 -14.71126,18.37159c-7.78386,9.61126 -16.77898,20.40019 -19.56136,23.17969c-4.86385,4.86385 -12.56991,4.86384 -17.43376,0c-4.86241,-4.86241 -4.85954,-12.56267 0,-17.42676c2.78869,-2.78579 13.57516,-11.77817 23.18669,-19.56136c9.61153,-7.78319 18.36458,-14.71126 18.36458,-14.71126c0.16159,-0.12638 0.31581,-0.26191 0.46191,-0.40592c3.53148,-3.52739 3.36971,-8.1981 2.64551,-12.01677c-0.7242,-3.81867 -2.23247,-7.58996 -3.88428,-11.11393c-2.31824,-4.94575 -3.75924,-6.97185 -5.15104,-9.18929l9.70019,-9.7002c0.34066,-0.2204 0.65527,-0.47867 0.93783,-0.76985zM26.84701,139.75c-2.967,0 -5.375,2.408 -5.375,5.375c0,2.967 2.408,5.375 5.375,5.375c2.967,0 5.375,-2.408 5.375,-5.375c0,-2.967 -2.408,-5.375 -5.375,-5.375z"></path></svg><h3>Настройки оформления</h3></span><p class="settings_filter_p">Загрузка постеров</p><div id="settings_home_block_style" style="margin-bottom:15px"><button id="Posters1_style" class="OptionsCardButton" title="Выбрать">Оригинал</button><button id="Posters2_style" class="OptionsCardButton" title="Выбрать">Оптимизированные (webP)</button></div><hr><p class="settings_filter_p">Отображение стрелки «Вверх»</p><div id="settings_home_block_style" style="margin-bottom:15px"><button id="backToTop1_style" class="OptionsCardButton" title="Выбрать">Включить</button><button id="backToTop2_style" class="OptionsCardButton" title="Выбрать">Отключить</button></div><p class="settings_filter_p">*Нажмите для выбора</p></div><div class="OptionsCard"><span class="OptionsTitle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 16 L 4.4648438 17.15625 L 4.4628906 17.15625 A 1 1 0 0 0 4 18 A 1 1 0 0 0 5 19 L 12 19 L 19 19 A 1 1 0 0 0 20 18 A 1 1 0 0 0 19.537109 17.15625 L 18 16 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 10 20 C 10 21.1 10.9 22 12 22 C 13.1 22 14 21.1 14 20 L 10 20 z"/></svg><h3>Настройки уведомлений</h3></span><p class="settings_filter_p">Режим</p><div id="settings_home_block_style" style="margin-bottom:15px"><button id="WebPushOn" class="OptionsCardButton" title="Выбрать">Включить</button><button id="WebPushOff" class="OptionsCardButton" title="Выбрать" data-state="Select">Отключить</button></div><div id="WebPushButtonBlock" style="display:none"><div id="settings_home_block_style" style="margin-bottom:15px"><button class="OptionsCardButton" title="Выбрать" id="TestWebPush">Тестовое уведомление</button></div><p class="settings_filter_p">Подписатся на</p><div id="settings_home_block_style" style="margin-bottom:15px"><button id="WebPushSubAll" class="OptionsCardButton" title="Выбрать">Все уведомления</button><button id="WebPushSubManual" class="OptionsCardButton" title="Выбрать">Только выбранные</button><button id="WebPushSubFavorites" class="OptionsCardButton" title="Выбрать">Избранные рализы</button></div></div><p class="settings_filter_p">*Нажмите для выбора</p><p class="settings_filter_p">*На iOS и iPadOS недоступно.</p></div><div class="OptionsCard"><span class="OptionsTitle"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><path d="M37.625,21.5c-10.82086,0 -19.70833,8.88748 -19.70833,19.70833v89.58333c0,10.82086 8.88748,19.70833 19.70833,19.70833h100.33333c10.82086,0 19.70833,-8.88748 19.70833,-19.70833v-89.58333c0,-10.82086 -8.88748,-19.70833 -19.70833,-19.70833zM37.625,32.25h100.33333c5.01031,0 8.95833,3.94802 8.95833,8.95833v89.58333c0,5.01031 -3.94802,8.95833 -8.95833,8.95833h-100.33333c-5.01031,0 -8.95833,-3.94802 -8.95833,-8.95833v-89.58333c0,-5.01031 3.94802,-8.95833 8.95833,-8.95833zM39.41667,37.625c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM132.58333,37.625c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM73.45833,57.34033c-1.56551,0 -3.14873,0.40875 -4.55615,1.23877c-2.73828,1.61766 -4.40218,4.5444 -4.40218,7.71956v39.41667c0,3.16833 1.65562,6.08083 4.39518,7.69857c2.78828,1.65712 6.06285,1.69528 8.88135,0.14697l35.83333,-19.70833l0.007,-0.007c2.84101,-1.5674 4.63314,-4.57697 4.63314,-7.83854c0,-3.26157 -1.79196,-6.27799 -4.63314,-7.84554l-0.007,-0.007l-35.84033,-19.70833l-0.007,-0.007c-1.33999,-0.73238 -2.82433,-1.0988 -4.3042,-1.0988zM39.41667,59.125c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM132.58333,59.125c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM75.25,69.3221l30.32536,16.6779l-30.32536,16.6849zM39.41667,80.625c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM132.58333,80.625c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM39.41667,102.125c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM132.58333,102.125c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM39.41667,123.625c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333zM132.58333,123.625c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333z"></path></svg><h3>Настройки страницы плеера</h3></span><p class="settings_filter_p">Пропуск опенинга</p><div id="settings_home_block_style" style="margin-bottom:15px"><button id="opening1_style" class="OptionsCardButton" title="Выбрать">Автоматически</button><button id="opening2_style" class="OptionsCardButton" title="Выбрать">Вручную</button></div><hr><p class="settings_filter_p">Нативный плеер iOS</p><div id="settings_home_block_style" style="margin-bottom:15px"><button id="Player1_style" class="OptionsCardButton" title="Выбрать">Включить</button><button id="Player2_style" class="OptionsCardButton" title="Выбрать">Отключить</button></div><p class="settings_filter_p">*Нажмите для выбора</p></div><div class="OptionsCard"><span class="OptionsTitle"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><path d="M37.625,21.5c-0.67668,0 -1.34927,0.03802 -2.00863,0.10498c-9.26222,0.94396 -16.65077,8.33251 -17.59473,17.59473v0.007c-0.06696,0.65935 -0.10498,1.32494 -0.10498,2.00163v7.16667v82.41667c0,10.82086 8.88748,19.70833 19.70833,19.70833h96.75c10.82086,0 19.70833,-8.88748 19.70833,-19.70833v-82.41667v-7.16667c0,-0.6763 -0.03725,-1.34913 -0.10498,-2.00863c-0.94396,-9.26222 -8.33951,-16.65077 -17.60172,-17.59473c-0.6595,-0.06774 -1.32532,-0.10498 -2.00163,-0.10498zM37.625,32.25c2.967,0 5.375,2.408 5.375,5.375c0,2.967 -2.408,5.375 -5.375,5.375c-2.967,0 -5.375,-2.408 -5.375,-5.375c0,-2.967 2.408,-5.375 5.375,-5.375zM55.54167,32.25c2.967,0 5.375,2.408 5.375,5.375c0,2.967 -2.408,5.375 -5.375,5.375c-2.967,0 -5.375,-2.408 -5.375,-5.375c0,-2.967 2.408,-5.375 5.375,-5.375zM77.04167,32.25h57.33333c2.967,0 5.375,2.408 5.375,5.375c0,2.967 -2.408,5.375 -5.375,5.375h-57.33333c-2.967,0 -5.375,-2.408 -5.375,-5.375c0,-2.967 2.408,-5.375 5.375,-5.375zM28.66667,53.75h114.66667v77.04167c0,5.01031 -3.94802,8.95833 -8.95833,8.95833h-96.75c-5.01031,0 -8.95833,-3.94802 -8.95833,-8.95833zM66.29167,68.08333c-14.82067,0 -26.875,12.05433 -26.875,26.875c0,14.82067 12.05433,26.875 26.875,26.875h7.16667c2.97058,0 5.375,-2.40442 5.375,-5.375c0,-2.97058 -2.40442,-5.375 -5.375,-5.375h-7.16667c-8.89025,0 -16.125,-7.23475 -16.125,-16.125c0,-8.89025 7.23475,-16.125 16.125,-16.125h7.16667c2.97058,0 5.375,-2.40442 5.375,-5.375c0,-2.97058 -2.40442,-5.375 -5.375,-5.375zM98.54167,68.08333c-2.97058,0 -5.375,2.40442 -5.375,5.375c0,2.97058 2.40442,5.375 5.375,5.375h7.16667c8.89025,0 16.125,7.23475 16.125,16.125c0,8.89025 -7.23475,16.125 -16.125,16.125h-7.16667c-2.97058,0 -5.375,2.40442 -5.375,5.375c0,2.97058 2.40442,5.375 5.375,5.375h7.16667c14.82067,0 26.875,-12.05433 26.875,-26.875c0,-14.82067 -12.05433,-26.875 -26.875,-26.875zM66.29167,89.58333c-2.97058,0 -5.375,2.40442 -5.375,5.375c0,2.97058 2.40442,5.375 5.375,5.375h39.41667c2.97058,0 5.375,-2.40442 5.375,-5.375c0,-2.97058 -2.40442,-5.375 -5.375,-5.375z"></path></svg><h3>Полезное</h3></span><p class="settings_filter_p">Ссылки</p><div id="settings_home_block_style" style="margin:15px 0"><a href="https://rozenrod.com" class="OptionsCardButton">Разработчик</a></div><hr><p class="settings_filter_p">Версия приложения</p><div id="settings_home_block_style" style="margin:15px 0"><a href="/notes" class="OptionsCardButton" data-route id="app_version" title="Код обновления">app version</a></div><p class="settings_filter_p">*Нажмите для выбора</p></div><div class="OptionsCard"><span class="OptionsTitle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M 23.5 3 C 15.912037 3 9.8572455 7.3634263 7.1269531 13.244141 C 4.3971841 19.123727 5.0147018 26.59189 10.388672 32.505859 A 1.50015 1.50015 0 0 0 10.390625 32.509766 A 1.50015 1.50015 0 0 0 10.390625 32.511719 C 11.410579 33.670823 12 35.078496 12 36.539062 L 12 43.5 A 1.50015 1.50015 0 1 0 15 43.5 L 15 36.539062 C 15 34.27163 14.084657 32.168183 12.642578 30.529297 C 12.652978 30.540367 12.619765 30.503034 12.609375 30.490234 C 7.9861966 25.404738 7.5869486 19.375145 9.8476562 14.505859 C 12.108364 9.6365737 17.051963 6 23.5 6 C 30.107143 6 33.521849 8.4791665 35.384766 11.21875 C 36.316224 12.588542 36.841485 14.053902 37.072266 15.316406 C 37.303046 16.57891 37.191781 17.678581 37.076172 18.025391 A 1.50015 1.50015 0 0 0 37.195312 19.242188 L 41.507812 26.818359 L 38.828125 28.158203 A 1.50015 1.50015 0 0 0 38 29.5 L 38 35.070312 C 38 36.687877 36.678963 37.927234 35.068359 37.816406 C 33.783787 37.727886 32.287 37.595876 30.677734 37.404297 A 1.50015 1.50015 0 0 0 29 38.894531 L 29 43.5 A 1.50015 1.50015 0 1 0 32 43.5 L 32 40.541016 C 32.985671 40.638276 34.024569 40.75093 34.861328 40.808594 C 38.162725 41.035766 41 38.376748 41 35.070312 L 41 30.427734 L 43.21875 29.318359 A 1.50015 1.50015 0 0 0 43.21875 29.316406 C 44.453459 28.697893 44.998147 27.180583 44.4375 25.917969 A 1.50015 1.50015 0 0 0 44.371094 25.783203 L 40.048828 18.189453 C 40.235887 17.192316 40.260333 16.084007 40.021484 14.777344 C 39.721015 13.133645 39.058776 11.286458 37.865234 9.53125 C 35.478151 6.0208335 30.892857 3 23.5 3 z M 24.980469 12.480469 A 1.50015 1.50015 0 0 0 23.566406 13.558594 L 19.566406 26.558594 A 1.50015 1.50015 0 1 0 22.433594 27.441406 L 26.433594 14.441406 A 1.50015 1.50015 0 0 0 24.980469 12.480469 z M 16.054688 14.484375 A 1.50015 1.50015 0 0 0 14.800781 15.099609 L 11.800781 19.099609 A 1.50015 1.50015 0 0 0 11.800781 20.900391 L 14.800781 24.900391 A 1.50015 1.50015 0 1 0 17.199219 23.099609 L 14.875 20 L 17.199219 16.900391 A 1.50015 1.50015 0 0 0 16.054688 14.484375 z M 30.048828 14.484375 A 1.50015 1.50015 0 0 0 28.800781 16.900391 L 31.125 20 L 28.800781 23.099609 A 1.50015 1.50015 0 1 0 31.199219 24.900391 L 34.199219 20.900391 A 1.50015 1.50015 0 0 0 34.199219 19.099609 L 31.199219 15.099609 A 1.50015 1.50015 0 0 0 30.048828 14.484375 z"/></svg><h3>Для разработчиков</h3></span><p class="settings_filter_p">Принудительное обновление</p><div id="settings_home_block_style" style="margin:5px 0 15px 0"><button class="OptionsCardButton">Обновить</button></div><hr><p class="settings_filter_p">Отправка служебных сообщений в консоль</p><div id="settings_home_block_style" style="margin:5px 0 15px 0"><button id="LogsConsoleOn" class="OptionsCardButton" title="Выбрать">Включить</button><button id="LogsConsoleOff" class="OptionsCardButton" title="Выбрать">Отключить</button></div><p class="settings_filter_p">*Нажмите для выбора</p></div></div></div>`;
		app.innerHTML = html;

		await this.account.setHTML();
		await this.design.setHTML();
		await this.notifications.setHTML();
		await this.player.setHTML();
		// await this.mirror.setHTML();
		await this.dev.setHTML();

		document.title = 'Опции — LiteLibria';

		document.getElementById('app_version').innerHTML = document.body.attributes[0].nodeValue;

		preloaderHide();

		return this;
	},
	account: {
		list: [],
		loadAPI: async function () {
			let PHPSESSID = localStorage.getItem('PHPSESSID');

			if (!PHPSESSID || PHPSESSID == 'undefined') {
				return {"error": "You are not authorized"};
			}
			
			let url = config["titels_API"]+"user?session="+PHPSESSID;
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})

			if(styleDebug) console.log('[Option profile load API] ok');
			
			return this.list;
		},
		setHTML: async function() {
			let json = [];

			if(Option.account.list.length == 0){
				json = await Option.account.loadAPI();
			} else {
				json = Option.account.list;
			}

			let profile = document.getElementById('profile');
			let auth = document.getElementById('auth');
			let logout = document.getElementById('logout');
			let form = document.getElementById('form_login');
			let login = document.getElementById('login');
			
			let my_login = document.getElementById('my_login');
			let my_nickname = document.getElementById('my_nickname');
			let my_email = document.getElementById('my_email');
			let my_vk_id = document.getElementById('my_vk_id');
			let my_patreon_id = document.getElementById('my_patreon_id');
			let my_profile_img = document.getElementById('my_profile_img');


			if(!json.error){
				if (json.login) my_login.innerHTML = json.login;
				if (json.nickname) my_nickname.innerHTML = json.nickname;
				if (json.email) my_email.innerHTML = json.email;
				if (json.vk_id) my_vk_id.innerHTML = json.vk_id;
				if (json.patreon_id) my_patreon_id.innerHTML = json.patreon_id;

				if (json.avatar_original) {
					my_profile_img.style.backgroundImage = `url('https://www.anilibria.tv/${json.avatar_original}')`;
				} else {
					function getRandomInt(max) {
						return Math.floor(Math.random() * max);
					}
					if (getRandomInt(4) == 1) {
						my_profile_img.style.backgroundImage = "url('/img/profile/my_profile_img.webp')";
					} else if (getRandomInt(4) == 2) {
						my_profile_img.style.backgroundImage = "url('/img/profile/my_profile_img_1.webp')";
					} else if (getRandomInt(4) == 3) {
						my_profile_img.style.backgroundImage = "url('/img/profile/my_profile_img_2.webp')";
					} else {
						my_profile_img.style.backgroundImage = "url('/img/profile/my_profile_img_3.webp')";
					}
				}
			} else {
				profile.setAttribute("data-state", "deactivated");
				auth.setAttribute("data-state", "");
			}

			logout.addEventListener("click", () => {
				localStorage.setItem('PHPSESSID', '');
				profile.setAttribute("data-state", "deactivated");
				auth.setAttribute("data-state", "");
				Option.account.list = [];
				Favorites.list = [];
			})
			login.addEventListener("click", () => {
				let formData = new FormData();
				formData.append('mail', form.querySelector('input[name="mail"]').value);
				formData.append('passwd', form.querySelector('input[name="pwd"]').value);

				fetch('https://www.anilibria.tv/public/login.php', {
					method: 'POST',
					body: formData
				})
				.then(function (response) {
					return Promise.resolve(response)
				})
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					if(styleDebug) console.log(data);
					if (data['key'] == 'success') {
						localStorage.setItem('PHPSESSID', data['sessionId']);
						profile.setAttribute("data-state", "");
						auth.setAttribute("data-state", "deactivated");
						document.getElementById('WebPushSubFavorites').disabled = false;
						Option.account.setHTML();
						Favorites.loadAPI();
					} else {
						document.getElementById('error_mes').setAttribute("style", `display:block;`);
					}
				})
				.catch(function (error) {
					console.log('error', error)
				})
			})
		}
	},
	design: {
		'setHTML': async function() {
			let postersMode = localStorage.getItem('postersMode');
			let backToTop = localStorage.getItem('backToTop');



			// Загрузка постеров
			let Posters1_style = document.getElementById('Posters1_style');
			let Posters2_style = document.getElementById('Posters2_style');

			if (postersMode == 'webp') {
				Posters1_style.dataset.state = '';
				Posters2_style.dataset.state = 'Select';
			} else {
				Posters1_style.dataset.state = 'Select';
				Posters2_style.dataset.state = '';
			}

			Posters1_style.addEventListener("click", () => {
				localStorage.setItem('postersMode', 'original');
				Posters1_style.dataset.state = 'Select';
				Posters2_style.dataset.state = '';
			})

			Posters2_style.addEventListener("click", () => {
				localStorage.setItem('postersMode', 'webp');
				Posters1_style.dataset.state = '';
				Posters2_style.dataset.state = 'Select';
			})




			// Отображение стрелки «Вверх»
			let backToTop1_style = document.getElementById('backToTop1_style');
			let backToTop2_style = document.getElementById('backToTop2_style');

			if (backToTop == 'false') {
				backToTop1_style.dataset.state = '';
				backToTop2_style.dataset.state = 'Select';
			} else {
				backToTop1_style.dataset.state = 'Select';
				backToTop2_style.dataset.state = '';
			}
			backToTop1_style.addEventListener("click", () => {
				localStorage.setItem('backToTop', 'true');
				backToTop1_style.dataset.state = 'Select';
				backToTop2_style.dataset.state = '';
			})
			backToTop2_style.addEventListener("click", () => {
				localStorage.setItem('backToTop', 'false');
				backToTop1_style.dataset.state = '';
				backToTop2_style.dataset.state = 'Select';
			})
		}
	},
	notifications: {
		'setHTML': async function() {
			updateBtn();
			let WebPushMode = localStorage.getItem('WebPushMode');
			let WebPushSubAll = document.getElementById('WebPushSubAll');
			let WebPushSubManual = document.getElementById('WebPushSubManual');
			let WebPushSubFavorites = document.getElementById('WebPushSubFavorites');

			let WebPushOn = document.getElementById('WebPushOn');
			let WebPushOff = document.getElementById('WebPushOff');

			let TestWebPush = document.getElementById('TestWebPush');

			if (WebPushMode == 'WebPushSubAll') {
				WebPushSubAll.dataset.state = 'Select';
				WebPushSubManual.dataset.state = '';
				WebPushSubFavorites.dataset.state = '';
			} else if (WebPushMode == 'WebPushSubFavorites') {
				WebPushSubAll.dataset.state = '';
				WebPushSubManual.dataset.state = '';
				WebPushSubFavorites.dataset.state = 'Select';
			} else {
				WebPushSubAll.dataset.state = '';
				WebPushSubManual.dataset.state = 'Select';
				WebPushSubFavorites.dataset.state = '';
			}
		
			if(!localStorage.getItem('PHPSESSID')) {
				WebPushSubFavorites.disabled = true;
				push_subscribe_manual();
			}

			WebPushOn.addEventListener("click", () => {
				WebPushOn.dataset.state = 'Select';
				WebPushOff.dataset.state = '';
				subscribeUser();
			})
			WebPushOff.addEventListener("click", () => {
				WebPushOn.dataset.state = '';
				WebPushOff.dataset.state = 'Select';
				unsubscribeUser();
			})

			TestWebPush.addEventListener("click", () => {
				push_message();
			})

			WebPushSubAll.addEventListener("click", () => {
				push_subscribe_all('save');
			})
			WebPushSubManual.addEventListener("click", () => {
				push_subscribe_manual();
			})
			WebPushSubFavorites.addEventListener("click", () => {
				push_subscribe_favorites('save');
			})

		}
	},
	player: {
		'setHTML': async function() {
			let my_skips_opening = localStorage.getItem('my_skips_opening');
			let my_player_style = localStorage.getItem('my_player_style');


			// Пропуск опенинга
			let opening1_style = document.getElementById('opening1_style');
			let opening2_style = document.getElementById('opening2_style');

			if (!my_skips_opening || my_skips_opening == '1') {
				opening1_style.dataset.state = 'Select';
				opening2_style.dataset.state = '';
			} else {
				opening1_style.dataset.state = '';
				opening2_style.dataset.state = 'Select';
			}

			opening1_style.addEventListener("click", () => {
				localStorage.setItem('my_skips_opening', '1');
				opening1_style.dataset.state = 'Select';
				opening2_style.dataset.state = '';
			})

			opening2_style.addEventListener("click", () => {
				localStorage.setItem('my_skips_opening', '0');
				opening1_style.dataset.state = '';
				opening2_style.dataset.state = 'Select';
			})




			// Нативный плеер iOS
			let Player1_style = document.getElementById('Player1_style');
			let Player2_style = document.getElementById('Player2_style');

			if (!my_player_style) {
				Player1_style.dataset.state = '';
				Player2_style.dataset.state = 'Select';
				localStorage.setItem('my_player_style', '2');
			} if (my_player_style == '1') {
				Player1_style.dataset.state = 'Select';
				Player2_style.dataset.state = '';
			} else {
				Player1_style.dataset.state = '';
				Player2_style.dataset.state = 'Select';
			}

			Player1_style.addEventListener("click", () => {
				localStorage.setItem('my_player_style', '1');
				Player1_style.dataset.state = 'Select';
				Player2_style.dataset.state = '';
			})

			Player2_style.addEventListener("click", () => {
				localStorage.setItem('my_player_style', '2');
				Player1_style.dataset.state = '';
				Player2_style.dataset.state = 'Select';
			})
		}
	},
	mirror: {
		'setHTML': async function() {
			let GetMirror = localStorage.getItem('GetMirror');

			let MirrorModeOff = document.getElementById('MirrorModeOff');
			let MirrorModeOn = document.getElementById('MirrorModeOn');

			if (!GetMirror || GetMirror == 'false') {
				MirrorModeOff.dataset.state = 'Select';
				MirrorModeOn.dataset.state = '';
			} else {
				MirrorModeOff.dataset.state = '';
				MirrorModeOn.dataset.state = 'Select';
			}

			MirrorModeOff.addEventListener("click", () => {
				localStorage.setItem('GetMirror', 'false');
				MirrorModeOff.dataset.state = 'Select';
				MirrorModeOn.dataset.state = '';
				location.reload();
			})

			MirrorModeOn.addEventListener("click", () => {
				localStorage.setItem('GetMirror', 'true');
				MirrorModeOff.dataset.state = '';
				MirrorModeOn.dataset.state = 'Select';
				location.reload();
			})
		}
	},
	dev: {
		'setHTML': async function() {
			let styleDebug = localStorage.getItem('styleDebug');

			let LogsConsoleOff = document.getElementById('LogsConsoleOff');
			let LogsConsoleOn = document.getElementById('LogsConsoleOn');

			if (!styleDebug || styleDebug == 'false') {
				LogsConsoleOff.dataset.state = 'Select';
				LogsConsoleOn.dataset.state = '';
			} else {
				LogsConsoleOff.dataset.state = '';
				LogsConsoleOn.dataset.state = 'Select';
			}

			LogsConsoleOff.addEventListener("click", () => {
				localStorage.setItem('styleDebug', 'false');
				LogsConsoleOff.dataset.state = 'Select';
				LogsConsoleOn.dataset.state = '';
				styleDebug = false;
			})

			LogsConsoleOn.addEventListener("click", () => {
				localStorage.setItem('styleDebug', 'true');
				LogsConsoleOff.dataset.state = '';
				LogsConsoleOn.dataset.state = 'Select';
				styleDebug = true;
			})
		}
	},
}