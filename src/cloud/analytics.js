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
        window.addEventListener("click", () => {
            if(href != window.location.href){
                href = window.location.href;
                setTimeout(() => Analytics.sync(), 1500)
            }
        });
    }, 
    sync: async function(data) {
        let url = `https://cloud.litelibria.com/analytics?hash=${localStorage.getItem('hashAPP')}&sessionCloud=${Analytics.sessionCloud()}&location=${(window.location.href).replace('#', '')}&time=${Date.now()}&os=${detectOS()}&browser=${detectBrowser()}&appVersion=${config.version}&title=${document.title}`
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"player": data})
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