let styleCatalog;
let widthAPP = document.documentElement.clientWidth;
let styleDebug = false;
let pageAPP;
let StatusEpisode = [];

// P2P
let myLogin = localStorage.getItem('myLogin');
let p2pMode = localStorage.getItem('p2pMode') || false;


// Переменные для WebPush
let isSubscribed = false;
let swRegistration = null;

// Переменная для видимости фильтров
let styleFilter = 1;

// Переменная для WebSocket
let socket;

let player;
let playerName;
let playerLength;
let playerPlay = false;
let serieHistory;

if(!localStorage.getItem('styleDebug')){
	localStorage.setItem('styleDebug', 'false')
} else {
	localStorage.getItem('styleDebug') == 'true' ? styleDebug = true : styleDebug = false;
}


if(styleDebug) console.log('1. Проверяем стиль карточек каталога');
if (widthAPP <= 800) {
	if(!localStorage.getItem('styleCatalog')) localStorage.setItem('styleCatalog', '1');
} else{
	if(!localStorage.getItem('styleCatalog')) localStorage.setItem('styleCatalog', '0');
}
styleCatalog = localStorage.getItem('styleCatalog')
if(styleDebug) console.log('[Style Catalog] ', localStorage.getItem('styleCatalog'));