const Home = {
	init: async function () {
		// let html = await fetch('/lib/pages/home/index.html').then((response) => response.text());
		let html = `<div class="LineBlock"><div class="LineList-Updates"><div style="display:flow-root"><h1 style="float:left">Последние обновления</h1></div><div class="LineGenerator-BigHovers" id="LineGenerator-Updates"><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div></div></div><div class="GridBlock"><div class="LeftBlock"><div class="LineList-Trailer" id="LineGenerator-Trailer" style="display:none"><a id="LineGenerator-Trailer-1" href="#" target="_blank"><div id="LineGenerator-Trailer-2" class="LineList-Trailer-BG"><div class="LineList-Trailer-BG-Gradien"><div class="LineList-Trailer-Text"><center><p id="LineGenerator-Trailer-3" class="LineList-Trailer-Text-Big"></p><p id="LineGenerator-Trailer-4" class="LineList-Trailer-Text-Medium"></p><p id="LineGenerator-Trailer-5" class="LineList-Trailer-Text-Small"></p></center></div><div id="LineGenerator-Trailer-6" class="LineList-Trailer-Poster"></div></div></div></a></div><h1>Поиск по жанрам</h1><div class="LineGenerator-Genres" id="LineGenerator-Genres"><div><div class="GenresCard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg><div class="GenresCardLoader"></div></div></div><div><div class="GenresCard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg><div class="GenresCardLoader"></div></div></div><div><div class="GenresCard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg><div class="GenresCardLoader"></div></div></div><div><div class="GenresCard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg><div class="GenresCardLoader"></div></div></div><div><div class="GenresCard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg><div class="GenresCardLoader"></div></div></div></div><div style="display:flow-root"><h1 style="float:left">Ожидается сегодня</h1><h1 style="float:right"><a class="LineList-Button-All" href="/schedule" data-route>Расписание</a></h1></div><div class="LineGenerator-SmallHovers" id="LineGenerator-Schedule"><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div></div><div class="LineList-SelectRecommend" id="LineGenerator-SelectRecommend" style="display:none"><div id="LineGenerator-SelectRecommend-1" class="LineList-SelectRecommend-BG"><div class="LineList-SelectRecommend-BG-Gradien"><div><center><div class="LineList-SelectRecommend-Text"><p id="LineGenerator-SelectRecommend-2" class="LineList-SelectRecommend-Text-Big"></p><p id="LineGenerator-SelectRecommend-3" class="LineList-SelectRecommend-Text-Medium"></p><p id="LineGenerator-SelectRecommend-4" class="LineList-SelectRecommend-Text-Small"></p></div></center></div><a id="LineGenerator-SelectRecommend-5" class="LineList-SelectRecommend-Poster" data-route style="display:none"></a><a id="LineGenerator-SelectRecommend-6" class="LineList-SelectRecommend-Poster" data-route style="display:none"></a><a id="LineGenerator-SelectRecommend-7" class="LineList-SelectRecommend-Poster" data-route style="display:none"></a><a id="LineGenerator-SelectRecommend-8" class="LineList-SelectRecommend-Poster" data-route style="display:none"></a><a id="LineGenerator-SelectRecommend-9" class="LineList-SelectRecommend-Poster" data-route style="display:none"></a></div></div></div><h1>Видео на каналах Anilibria</h1><div class="LineGenerator-BigHovers" id="LineGenerator-Video"><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-BigHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div></div><div id="UnwatchedNone"><h1>Недосмотренные релизы</h1><div class="LineGenerator-SmallHovers" id="LineGenerator-Unwatched"><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div></div></div><h1>Лучшее сезона в прошлом году</h1><div class="LineGenerator-SmallHovers" id="LineGenerator-Recomend"><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-SmallHovers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div></div></div><div class="RightBlock" id="RightBlockSize"><div class="LineList-Announce"><h1>Новости по релизам</h1><div class="LineGenerator-AnnounceSlider"><div class="LineGenerator-Announce" id="LineGenerator-Announce"><div class="LineCard-Announce"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-Announce"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-Announce"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div><div class="LineCard-Announce"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"></path></svg></div></div></div></div><div class="LineCard-Donate"><a href="https://www.anilibria.tv/pages/donate.php"><div class="LineCard-Donate-Card"><img src="img/libriatyan/0.webp" alt=""><p>Поддержать проект AniLibria через их сайт!</p></div></a><a href="https://rozenrod.com/#donation"><div class="LineCard-Donate-Card"><img src="img/libriatyan/6.webp" alt=""><p>Поддержать разработчика приложения на его сайте!</p></div></a></div><div id="LineList-History"><div style="display:flow-root"><h1 style="float:left">История просмотров</h1><h1 style="float:right"><a class="LineList-Button-All" href="/history" data-route>Ещё...</a></h1></div><div class="LineGenerator-HistorySlider"><div class="LineGenerator-History" id="LineGenerator-History"><div id="HistoryNoneLine"><img src="img/libriatyan/4.webp" alt=""><p style="color:var(--ColorThemes3)">Пока пусто...</p></div></div></div></div><div class="LineList-Notes"><div style="display:flow-root"><h1 style="float:left">Заметки к обновлениям.</h1><h1 style="float:right"><a class="LineList-Button-All" href="/notes" data-route>Ещё...</a></h1></div><div id="LineGenerator-Notes"></div></div></div></div></div>`;
		app.innerHTML = html;

		await this.updates.setHTML();
		await this.genres.setHTML();
		await this.schedule.setHTML();
		await this.video.setHTML();
		await this.recomend.setHTML();
		await this.unwatched.setHTML();
		await this.announce.setHTML();
		await this.NEWS.selectRecommend();
		await this.NEWS.trailer();
		await this.history.setHTML();
		await this.notes.setHTML();
		

		document.title = 'LiteLibria';

		preloaderHide();
	},
	updates: {
		list: [],
		loadAPI: async function () {
			let url = config["titels_API"]+"title/updates?filter=id,names,posters.medium,player.episodes,description,genres&limit=15";
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})

			if(styleDebug) console.log('[Home updates load API] ok');
			
			return this.list;
		},
		setHTML: async function () {
			let json = [];

			if(Home.updates.list.length == 0){
				json = await Home.updates.loadAPI();
			} else {
				json = Home.updates.list;
			}

			document.getElementById('LineGenerator-Updates').innerHTML = "";

			for (let i = 0; json.list.length > i; i++) {
				genres = json.list[i].genres;

				posters = function () {
					return localStorage.getItem('postersMode') == 'webp'
						? `${config.webpPreview}${json.list[i].id}/${json.list[i].player.episodes.last}`
						: `${config.CustomPosters}${json.list[i].id}/${json.list[i].player.episodes.last}/1.jpg`
				}

				Card.BigHovers({
					idDOM: 'LineGenerator-Updates',
					posters: posters(),
					name: json.list[i].names.ru,
					genres: genres,
					description: json.list[i].description,
					id: json.list[i].id
				});
			}
		}
	},
	genres: {
		list: [],
		loadAPI: async function () {
			let url = config["titels_API"]+"genres";
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})

			if(styleDebug) console.log('[Home genres load API] ok');

			return this.list;
		},
		setHTML: async function () {
			let json = [];

			if(Home.genres.list.length == 0){
				json = await Home.genres.loadAPI();
			} else {
				json = Home.genres.list;
			}
			document.getElementById('LineGenerator-Genres').innerHTML = "";

			function makeRandomArr(a, b) {
				return Math.random() - 0.5;
			}
			
			json.sort(makeRandomArr);

			for (let i = 0; json.length > i; i++) {
				Card.GenresCard({
					idDOM: 'LineGenerator-Genres',
					id: json[i],
					a: randomColor(),
					b: randomColor(),
					c: randomColor(),
					d: randomColor(),
					alfa: 'b3'
				});
			}

		}
	},
	schedule: {
		list: [],
		loadAPI: async function () {
			let url = config["titels_API"]+"title/schedule?filter=id,names,posters.medium,player.episodes,type";
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})

			if(styleDebug) console.log('[Home schedule load API] ok');

			return this.list;
		},
		setHTML: async function () {
			let json = [];

			if(Home.schedule.list.length == 0){
				json = await Home.schedule.loadAPI();
			} else {
				json = Home.schedule.list;
			}
			document.getElementById('LineGenerator-Schedule').innerHTML = "";

			day = function (){
				let d = new Date();
				if(d.getDay()==0) return 6;
				else if(d.getDay()==1) return 0;
				else if(d.getDay()==2) return 1; 
				else if(d.getDay()==3) return 2; 
				else if(d.getDay()==4) return 3; 
				else if(d.getDay()==5) return 4;
				else return 5;
			}

			for (let i = 0; json[day()].list.length > i; i++) {
				let type = () => {
					if(json[day()].list[i].type.code == 0){
						return 'Фильм';
					} else if(json[day()].list[i].type.code == 1){
						return 'Cерия';
					} else if(json[day()].list[i].type.code == 2){
						return 'OVA';
					} else if(json[day()].list[i].type.code == 3){
						return 'ONA';
					} else if(json[day()].list[i].type.code == 4){
						return 'Спешл';
					} else if(json[day()].list[i].type.code == 5){
						return 'WEB';
					} else {
						return 'Cерия';
					}
				}

				posters = function () {
					return localStorage.getItem('postersMode') == 'webp'
						? `${config.webpPosters}${json[day()].list[i].id}.webp`
						: `${config.posters}${json[day()].list[i].posters.medium.url}`
				}

				Card.SmallHovers({
					idDOM: 'LineGenerator-Schedule',
					last: 0,
					serie: json[day()].list[i].player.episodes.last,
					type: type(),
					posters: posters(),
					id: json[day()].list[i].id
				})
			}

			StatusEpisode.length == 0 ? loadAPIStatusEpisode() : GeneratorStatusEpisode();
		}
	},
	video: {
		list: [],
		loadAPI: async function () {
			let url = config["titels_API"]+"youtube?limit=10";
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})

			if(styleDebug) console.log('[Home video load API] ok');

			return this.list;
		},
		setHTML: async function () {
			let json = [];
			if(Home.video.list.length == 0){
				json = await Home.video.loadAPI()
			} else {
				json = Home.video.list;
			}
			document.getElementById('LineGenerator-Video').innerHTML = "";

			for (let i = 0; json.list.length > i; i++) {
				posters = `https://img.youtube.com/vi_webp/${json.list[i].youtube_id}/hqdefault.webp`

				Card.BigHovers({
					idDOM: 'LineGenerator-Video',
					posters: posters,
					name: json.list[i].title,
					genres: '',
					description: '',
					id: json.list[i].youtube_id,
					youtube: true
				});
			}
		}
	},
	recomend: {
		list: [],
		loadAPI: async function () {
			let d = new Date();

			let year = d.getFullYear() - 1;
			let month =  d.getMonth() + 1;
			
			RecomendSeason = function (){
				if (month == 1 || month == 2 || month == 3)
					return 1;
				else if (month == 4 || month == 5 || month == 6)
					return 2;
				else if (month == 7 || month == 8 || month == 9)
					return 3;
				else if (month == 10 || month == 11 || month == 12) 
					return 4;
				else {
					return 1;
				}
			}

			let url = config["titels_API"]+"title/search?season_code="+RecomendSeason()+"&year="+year+"&filter=id,names,posters.medium,player.episodes,type&limit=15";
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})

			if(styleDebug) console.log('[Home recomend load API] ok');

			return this.list;
		},
		setHTML: async function () {
			let json = [];

			if(Home.recomend.list.length == 0){
				json = await Home.recomend.loadAPI();
			} else {
				json = Home.recomend.list;
			}
			document.getElementById('LineGenerator-Recomend').innerHTML = "";

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
					idDOM: 'LineGenerator-Recomend',
					last: json.list[i].player.episodes.last,
					serie: json.list[i].player.episodes.last,
					type: type(),
					posters: posters(),
					id: json.list[i].id
				})
			}
		}
	},
	unwatched: {
		setHTML: async function () {
			let json = getUniqueElems(historyGet());
			json.sort(function(a, b) {
				if (a.date < b.date)
						return -1;
				if (a.date > b.date)
						return 1;
				return 0;
			});

			if(json.length > 0){
				document.getElementById('LineGenerator-Unwatched').innerHTML = '';
				var iDisplay = 0;

				for (let i = 0; i < json.length; i++) {
					let minutes = (json[i].time[0] / 60).toFixed(2).replace(".", ":");
					let SerieUnwatched = json[i].serieLength - json[i].serie;
					if(json[i].name == undefined ){
						loadNameHistory(json[i].id, json[i].serie, json[i].time[0], json[i].time[1], json[i].date)
					}
					if(json[i].serieLength == undefined ){
						loadNameHistory(json[i].id, json[i].serie, json[i].time[0], json[i].time[1], json[i].date)
					}
					posters = `${config["webpPosters"]}${json[i].id}.webp`;

					if(json[i].serieLength > json[i].serie){
						iDisplay++;
						Card.SmallHovers({
							idDOM: 'LineGenerator-Unwatched',
							last: SerieUnwatched,
							serie: json[i].serie,
							minutes: minutes,
							posters: posters,
							id: json[i].id
						})
					}
				}
				if(iDisplay == 0){
					document.getElementById("UnwatchedNone").style.display = "none";
				}
			} else {
				document.getElementById("UnwatchedNone").style.display = "none";
			}
		}
	},
	NEWS: {
		list: [],
		loadAPI: async function () {
			let url = "https://API.litelibria.com/news";
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})

			if(styleDebug) console.log('[Home NEWS load API] ok');
			
			return this.list;
		},
		'selectRecommend': async function () {
			let json = [];

			if(Home.NEWS.list.length == 0){
				json = await Home.NEWS.loadAPI();
			} else {
				json = Home.NEWS.list;
			}

			if(json.blockSelectRecommend.Visible){
				document.getElementById("LineGenerator-SelectRecommend").style.display = "";
				document.getElementById("LineGenerator-SelectRecommend-1").setAttribute("style", `background-image: url(${json.blockSelectRecommend.ImageBG})`);
				document.getElementById("LineGenerator-SelectRecommend-2").innerHTML = json.blockSelectRecommend.TextBig;
				document.getElementById("LineGenerator-SelectRecommend-3").innerHTML = json.blockSelectRecommend.TextMedium;
				document.getElementById("LineGenerator-SelectRecommend-4").innerHTML = json.blockSelectRecommend.TextSmall;
		
			
				if(json.blockSelectRecommend.titelsLeight >= 1){
					document.getElementById("LineGenerator-SelectRecommend-5").setAttribute("style", `background-image: url(${json.blockSelectRecommend.titels[1].Poster})`);
					document.getElementById("LineGenerator-SelectRecommend-5").setAttribute("href", `/release/${json.blockSelectRecommend.titels[1].id}`);
				}
				if(json.blockSelectRecommend.titelsLeight >= 2){
					document.getElementById("LineGenerator-SelectRecommend-6").setAttribute("style", `background-image: url(${json.blockSelectRecommend.titels[2].Poster})`);
					document.getElementById("LineGenerator-SelectRecommend-6").setAttribute("href", `/release/${json.blockSelectRecommend.titels[2].id}`);
				}
				if(json.blockSelectRecommend.titelsLeight >= 3){
					document.getElementById("LineGenerator-SelectRecommend-7").setAttribute("style", `background-image: url(${json.blockSelectRecommend.titels[3].Poster})`);
					document.getElementById("LineGenerator-SelectRecommend-7").setAttribute("href", `/release/${json.blockSelectRecommend.titels[3].id}`);
				}
				if(json.blockSelectRecommend.titelsLeight >= 4){
					document.getElementById("LineGenerator-SelectRecommend-8").setAttribute("style", `background-image: url(${json.blockSelectRecommend.titels[4].Poster})`);
					document.getElementById("LineGenerator-SelectRecommend-8").setAttribute("href", `/release/${json.blockSelectRecommend.titels[4].id}`);
				}
				if(json.blockSelectRecommend.titelsLeight >= 5){
					document.getElementById("LineGenerator-SelectRecommend-9").setAttribute("style", `background-image: url(${json.blockSelectRecommend.titels[5].Poster})`);
					document.getElementById("LineGenerator-SelectRecommend-9").setAttribute("href", `/release/${json.blockSelectRecommend.titels[5].id}`);
				}
			}
		},
		'trailer': async function () {
			let json = [];

			if(Home.NEWS.list.length == 0){
				json = await Home.NEWS.loadAPI();
			} else {
				json = Home.NEWS.list;
			}

			if(json.blockNewTrailer.Visible){
				urlVideo = json.blockNewTrailer.YouTubeID != false ? `https://www.youtube.com/watch?v=${json.blockNewTrailer.YouTubeID}` : ""
		
				document.getElementById("LineGenerator-Trailer").style.display = "";
				document.getElementById("LineGenerator-Trailer-1").setAttribute("href", urlVideo);
				document.getElementById("LineGenerator-Trailer-2").setAttribute("style", `background-image: url(${json.blockNewTrailer.ImageBG})`);
				document.getElementById("LineGenerator-Trailer-3").innerHTML = json.blockNewTrailer.TextBig;
				document.getElementById("LineGenerator-Trailer-4").innerHTML = json.blockNewTrailer.TextMedium;
				document.getElementById("LineGenerator-Trailer-5").innerHTML = json.blockNewTrailer.TextSmall;
				document.getElementById("LineGenerator-Trailer-6").setAttribute("style", `background-image: url(${json.blockNewTrailer.Poster})`);
			}
		}
	},
	announce: {
		list: [],
		loadAPI: async function () {
			let url = config["titels_API"]+"title/updates?filter=id,names,posters.medium,announce&limit=35";
			this.list = await fetch(url)
			.then(function (response) {
				return response.json();
			})

			if(styleDebug) console.log('[Home announce load API] ok');

			return this.list;
		},
		'setHTML': async function () {
			let json = [];

			if(Home.announce.list.length == 0){
				json = await Home.announce.loadAPI();
			} else {
				json = Home.announce.list;
			}
			document.getElementById('LineGenerator-Announce').innerHTML = "";

			for (let i = 0; json.list.length > i; i++) {
				if(json.list[i].announce){
					posters = function () {
						return localStorage.getItem('postersMode') == 'webp'
							? `${config.webpPosters}${json.list[i].id}.webp`
							: `${config.posters}${json.list[i].posters.medium.url}`
					}

					Card.HistoryCard({
						idDOM: 'LineGenerator-Announce',
						id: json.list[i].id,
						title: json.list[i].names.ru,
						text: json.list[i].announce,
						posters: posters()
					})
				}
			}
		}
	},
	history: {
		setHTML: async function () {
			HistoryList = getUniqueElems(historyGet());
			HistoryList.sort(function(a, b) {
				if (a.date > b.date)
						return -1;
				if (a.date < b.date) 
						return 1;     
				return 0;
			});

			if(HistoryList.length > 0){
				document.getElementById('LineList-History').setAttribute('data-state', 'active');
				document.getElementById('LineGenerator-History').innerHTML = "";
				let idH = [];
		
				for (let i = 0; i < HistoryList.length && i < 6; i++) {
					idH.push(HistoryList[i].id);
					let minutes = (HistoryList[i].time[0] / 60).toFixed(2).replace(".", ":");
					let dateObject = new Date(HistoryList[i].date);
					let date = dateObject.toLocaleString()


					posters = `${config["webpPosters"]}${HistoryList[i].id}.webp`

					Card.HistoryCard({
						idDOM: 'LineGenerator-History',
						id: HistoryList[i].id,
						title: HistoryList[i].name,
						text: `Серия ${HistoryList[i].serie}   Минута ${minutes}`,
						date: `Дата ${date}`,
						posters: posters
					})
				}
			}
		}
	},
	notes: {
		setHTML: function () {
			for (let i = 0; i < updateNotes.length; i++) {
				if(i < 2){
					let more_text = (json) => {
						let a = '';
						for (let j = 0; j < json.length; j++) {
							a += `
								<li class="d-flex">
									<div class="change-badge his_${json[j]['type']}">${json[j]['type']}</div>
									<div class="change-description">${json[j]['text']}</div>
								</li>
							`;
						}
						return a;
					}


					let div = document.createElement('div');
					document.getElementById('LineGenerator-Notes').appendChild(div);
					div.className = 'his_block';
					div.innerHTML += `
							<p class="his_block_v1"><span class="his_block_v2">${updateNotes[i]['prefix']} - ${updateNotes[i]['version']}</span> <span>${updateNotes[i]['date']}</span></p>
							<ul class="change-log">
								${more_text(updateNotes[i]['update'])}
							</ul>
					`;
				}
			}
		}
	}
}