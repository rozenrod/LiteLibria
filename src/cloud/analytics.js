const Analytics = {
    sessionCloud: function() {
        if(sessionStorage.getItem('sessionCloud')){
            return sessionStorage.getItem('sessionCloud')
        }
        sessionStorage.setItem('sessionCloud', uuidv4())
        return sessionStorage.getItem('sessionCloud')
    },

    init: async function() {
        let href;
        window.addEventListener("click", (event) => {
            if(href != window.location.href){
                href = window.location.href;
                Analytics.sync();
            }
        });
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