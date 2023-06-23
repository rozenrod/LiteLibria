let AnalyticsTimeoutId;
let ANALYTUCS_SYNC_PERIOD = 1000 * 60;
const Analytics = {
    sessionCloud: function() {
        if(sessionStorage.getItem('sessionCloud')){
            return sessionStorage.getItem('sessionCloud')
        }
        sessionStorage.setItem('sessionCloud', uuidv4())
        return sessionStorage.getItem('sessionCloud')
    },

    init: async function() {
        if (AnalyticsTimeoutId) {
            clearTimeout(AnalyticsTimeoutId);
        }
        AnalyticsTimeoutId = setTimeout(() => {
            Analytics.sync()
                .catch(e => console.log('Failed to synchronize Cloud Analytics', e))
                .finally(() => {
                    Analytics.init();
                })
        }, ANALYTUCS_SYNC_PERIOD)
    }, 
    sync: async function() {
        let url = `https://cloud.litelibria.com/analytics?hash=${localStorage.getItem('hashAPP')}&sessionCloud=${Analytics.sessionCloud()}&location=${window.location.href}&title=${document.title}&time=${Date.now()}&os=${detectOS()}&browser=${detectBrowser()}&appVersion=${config.version}`
        await fetch(url, {
            method: 'POST'
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