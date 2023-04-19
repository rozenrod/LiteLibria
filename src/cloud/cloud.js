const Cloud = {
    list: {},
    init: async function() {
        await Cloud.load();
        CloudSync();
        if(styleDebug) console.log("Cloud data ", Cloud.list)
    },
    load: async function() {
        let url = `https://cloud.litelibria.com/?hash=${localStorage.getItem('hashAPP')}&sessid=${localStorage.getItem('PHPSESSID')}`

        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if(styleDebug) console.log('Success:', data);
            
            if(!localStorage.getItem('hashAPP')) localStorage.setItem('hashAPP', data.hash)
            Cloud.list = data;

            historySync(data.history)
        })
        .catch((error) => {
            if(styleDebug) console.error('Error:', error);
        });
    },
    update: async function({history, config}) {
        let url = `https://cloud.litelibria.com/?hash=${localStorage.getItem('hashAPP')}&sessid=${localStorage.getItem('PHPSESSID')}`

        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "history": history, "config": config})
        })
        .then((response) => response.json())
        .then((data) => {
            if(styleDebug) console.log('Success:', data);
            
        })
        .catch((error) => {
            if(styleDebug) console.error('Error:', error);
        });
    }
}

let SYNC_PERIOD = 1000 * 60 * 2     // 2 минуты
let configSyncTimeoutId

function CloudSync(delay) {
	if (configSyncTimeoutId) {
		clearTimeout(configSyncTimeoutId);
	}
	configSyncTimeoutId = setTimeout(() => {
		Cloud.load()
        if(styleDebug) console.log("Cloud data ", Cloud.list)
			.catch(e => console.log('Failed to synchronize Cloud', e))
			.finally(() => CloudSync())
	}, typeof delay === 'undefined' ? SYNC_PERIOD : delay)
}