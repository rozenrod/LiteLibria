const Cloud = {
    list: {},
    init: async function() {
        await Cloud.load();
        await Cloud.update({"history": JSON.parse(localStorage.getItem("history"))});
        CloudSync();
        if(styleDebug) console.log("Cloud data ", Cloud.list)
    },
    load: async function() {
        let url = `https://cloud.litelibria.com/?hash=${localStorage.getItem('hashAPP')}&sessid=${localStorage.getItem('PHPSESSID')}`

        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if(styleDebug) console.log('Success:', data);
            
            localStorage.setItem('hashAPP', data.hash)
            Cloud.list = data;

            if(IsJsonString(data.history)) {
                historySync(JSON.parse(data.history))
            }
            else {
                historySync(data.history)
            }
        })
        .catch((error) => {
            if(styleDebug) console.error('Error:', error);
        });

        History.list = [];
        await History.getHistory();
        if(document.getElementById('HistoryGenerator')){ 
            document.getElementById('HistoryGenerator').innerHTML = ``;
            await History.getHistory();
            await History.setHTML();
        }
        if(document.getElementById('LineGenerator-History')){
            document.getElementById('LineGenerator-History').innerHTML = "";
            await Home.history.setHTML();
        }

        if(styleDebug) console.log("Cloud data ", Cloud.list)
    },
    update: async function({history, config}) {
        let url = `https://cloud.litelibria.com/?hash=${localStorage.getItem('hashAPP')}&sessid=${localStorage.getItem('PHPSESSID')}`

        await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "history": JSON.stringify(history), "config": config})
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

let SYNC_PERIOD = 1000 * 60 * 5     // 2 минуты
let configSyncTimeoutId

function CloudSync(delay) {
	if (configSyncTimeoutId) {
		clearTimeout(configSyncTimeoutId);
	}
	configSyncTimeoutId = setTimeout(() => {
		Cloud.load()
			.catch(e => console.log('Failed to synchronize Cloud', e))
			.finally(() => {
                if(localStorage.getItem('CloudSync') == 'true') CloudSync()
            })
	}, typeof delay === 'undefined' ? SYNC_PERIOD : delay)
}