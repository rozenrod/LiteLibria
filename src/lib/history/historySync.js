// var SYNC_PERIOD = 1000 * 60 * 2     // 2 минуты

var SYNC_PERIOD = 1000 * 30     // 30 секунд

var API_KEY = config["g_apiKey"];
var CLIENT_ID = config["g_clientId"];
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.appdata';

var DEFAULT_CONFIG = []
let configSyncTimeoutId

let tokenClient;
let gapiInited = false;
let gisInited = false;
let googleLogIn = false;

function gapiLoaded() {
	gapi.load('client', intializeGapiClient);
}

async function intializeGapiClient() {
	await gapi.client.init({
		'apiKey': API_KEY,
		'clientId': CLIENT_ID,
		'discoveryDocs': DISCOVERY_DOCS,
		'scope': SCOPES
	}).then(function () {
		GoogleAuth = gapi.auth2.getAuthInstance();
		var user = GoogleAuth.currentUser.get();
      	var isAuthorized = user.hasGrantedScopes(SCOPES);

		if(isAuthorized){
			gapiInited = true;
			initHistory();
		}
		googleLogIn = isAuthorized;
		checkLogIn();
	});
	gapiInited = true;
}
// async function intializeGapiClient() {
// 	await gapi.client.init({
// 		apiKey : API_KEY ,
// 		discoveryDocs: DISCOVERY_DOCS,
// 	});
// 	gapiInited = true;
// }

function gisLoaded() {
	tokenClient = google.accounts.oauth2.initTokenClient({
		client_id: CLIENT_ID,
		scope: SCOPES,
		callback: '',
	});
	gisInited = true;
}

function handleAuthClick() {
	tokenClient.callback = async (resp) => {
		if (resp.error !== undefined) {
			throw (resp);
		}
		initHistory();
		googleLogIn = true;
		checkLogIn();
	};
	if (gapi.client.getToken() === null) {
		// tokenClient.requestAccessToken({prompt: 'consent'});
		tokenClient.requestAccessToken({prompt: ''});
	} else {
		tokenClient.requestAccessToken({prompt: ''});
	}
}
function handleSignoutClick() {
	const token = gapi.client.getToken();
	if (token !== null) {
		google.accounts.oauth2.revoke(token.access_token);
		gapi.client.setToken('');
		googleLogIn = false;
		checkLogIn();
	}
}

function prom(gapiCall, argObj) {
	return new Promise((resolve, reject) => {
		gapiCall(argObj).then(resp => {
			if (resp && (resp.status < 200 || resp.status > 299)) {
				console.log('GAPI call returned bad status', resp)
				reject(resp)
			} else {
				resolve(resp)
			}
		}, err => {
			console.log('GAPI call failed', err)
			reject(err)
		})
	})
}

async function createEmptyFile(name, mimeType) {
	const resp = await prom(gapi.client.drive.files.create, {
		resource: {
			name: name,
			mimeType: mimeType || 'text/plain',
			parents: ['appDataFolder']
		},
		fields: 'id'
	})
	return resp.result.id
}

async function getConfigFileId() {
	let configFileId = localStorage.getItem('configFileId')
	if (!configFileId) {
		let response;
		try {
			response = await gapi.client.drive.files.list({
				'spaces': 'appDataFolder',
				'pageSize': 1,
				'fields': 'files(id, name)',
			});
		} catch (err) {
			configFileId = await createEmptyFile('config.json')
			return;
		}
		const configFiles = response.result.files;
		if (!configFiles || configFiles.length == 0) {
			configFileId = await createEmptyFile('config.json')
		} else {
			configFileId = configFiles[0].id
		}
		localStorage.setItem('configFileId', configFileId)
	}
	return configFileId
}

async function upload(fileId, content) {
	return prom(gapi.client.request, {
		path: `/upload/drive/v3/files/${fileId}`,
		method: 'PATCH',
		params: {uploadType: 'media'},
		body: JSON.stringify(content)
	})
}

async function download(fileId) {
	const resp = await prom(gapi.client.drive.files.get, {
		fileId: fileId,
		alt: 'media'
	})
	return resp.result || resp.body
}

function getConfig() {
	let ret
	try {
		ret = JSON.parse(localStorage.getItem('history'))
	} catch(e) {}
	return ret || {...DEFAULT_CONFIG}
}

async function saveConfig(newConfig) {
	if (googleLogIn) {
		const configFileId = await getConfigFileId()
		upload(configFileId, newConfig)
	}
}

async function syncConfig() {
	const configFileId = await getConfigFileId()
	try {
		var remoteConfig = await download(configFileId);
		
		if(styleDebug) console.log("Google history", remoteConfig);

		historySync(remoteConfig, configFileId);
		History.list = [];
		if(document.getElementById('HistoryGenerator')){
			document.getElementById('HistoryGenerator').innerHTML = ``;
			await History.getHistory();
			await History.setHTML();
		}
	} catch(e) {
		if (e.status === 404) {
			localStorage.removeItem('configFileId')
			syncConfig()
		} else {
			throw e
		}
	}
}

function scheduleConfigSync(delay) {
	if (configSyncTimeoutId) {
		clearTimeout(configSyncTimeoutId)
	}
	configSyncTimeoutId = setTimeout(() => {
		syncConfig()
			.catch(e => console.log('Failed to synchronize config', e))
			.finally(() => scheduleConfigSync())
	}, typeof delay === 'undefined' ? SYNC_PERIOD : delay)
}

function initHistory(){
	if (gapiInited && gisInited) {
		syncConfig()
		scheduleConfigSync()
	}
}

function checkLogIn(){
	if(document.getElementById("signinButton")) {
		let signinButton = document.getElementById("signinButton");
		let signoutButton = document.getElementById("signoutButton");

		if(googleLogIn) {
			signinButton.style.display = 'none';
			signoutButton.style.display = '';
		} else {
			signinButton.style.display = '';
			signoutButton.style.display = 'none';
		}
	}
}