// Функции WebPush.
const isSupported = () =>
'Notification' in window &&
'serviceWorker' in navigator &&
'PushManager' in window

function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
function updateBtn() {
  if (isSupported()) {
    if (Notification.permission === 'denied') {
      if (document.getElementById('WebPushOn') !== null && document.getElementById('WebPushOff') !== null) {
        document.getElementById('WebPushOn').disabled = true;
        document.getElementById('WebPushOff').disabled = true;

        document.getElementById('WebPushOn').title = 'Не удалось подписаться на пользователя';
        document.getElementById('WebPushOff').title = 'Не удалось подписаться на пользователя';
        document.getElementById('WebPushButtonBlock').style.display = 'none';
      }
      return;
    }

    if (isSubscribed) {
      if (document.getElementById('WebPushOn') !== null && document.getElementById('WebPushOff') !== null) {
        document.getElementById('WebPushOn').dataset.state = 'Select';
        document.getElementById('WebPushOff').dataset.state = '';
        document.getElementById('WebPushButtonBlock').style.display = 'block';
      }
    } else {
      if (document.getElementById('WebPushOn') !== null && document.getElementById('WebPushOff') !== null) {
        document.getElementById('WebPushOn').dataset.state = '';
        document.getElementById('WebPushOff').dataset.state = 'Select';
        document.getElementById('WebPushButtonBlock').style.display = 'none';
      }
    }
  } else {
    if (document.getElementById('WebPushOn') !== null && document.getElementById('WebPushOff') !== null) {
      document.getElementById('WebPushOn').disabled = true;
      document.getElementById('WebPushOff').disabled = true;

      document.getElementById('WebPushOn').title = 'Не удалось подписаться на пользователя';
      document.getElementById('WebPushOff').title = 'Не удалось подписаться на пользователя';
      document.getElementById('WebPushButtonBlock').style.display = 'none';
    }
  }
}

function subscribeUser() {
  const applicationServerPublicKey = localStorage.getItem('applicationServerPublicKey');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  let subscription = swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription_data) {
      if(styleDebug) console.log('User is subscribed.');

      localStorage.setItem('sub_token',JSON.stringify(subscription_data));
      isSubscribed = true;
      localStorage.setItem('WebPushMode', 'WebPushSubManual')

      updateBtn();
    })
    .catch(function(err) {
      if(styleDebug) console.log('Failed to subscribe the user: ', err);
      updateBtn();
    });
}

function unsubscribeUser() {
	swRegistration.pushManager.getSubscription()
		.then(function(subscription_data) {
			if (subscription_data) {
				return subscription_data.unsubscribe();
			}
		})
		.catch(function(error) {
			if(styleDebug) console.log('Error unsubscribing', error);
		})
		.then(function() {
      push_subscribe_all('dell')
      if(!localStorage.getItem('PHPSESSID')) push_subscribe_favorites('dell')

			if(styleDebug) console.log('User is unsubscribed.');
			isSubscribed = false;

      localStorage.setItem('WebPushMode', '')

			updateBtn();
		});
}

function push_message() {
	if(styleDebug) console.log("sub_token", localStorage.getItem('sub_token'));
  const data = {'sub_token':localStorage.getItem('sub_token')};

  fetch('https://push.litelibria.com/push_v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    if(styleDebug) console.log('Success:', data);
  })
  .catch((error) => {
    if(styleDebug) console.error('Error:', error);
  });
}

function push_subscribe_id(sub_id, method) {
	if(styleDebug) console.log("sub_token", localStorage.getItem('sub_token'));
	if(styleDebug) console.log("sub_id", sub_id);
  if(styleDebug) console.log("method", method);

  const data = {'sub_token':localStorage.getItem('sub_token'), 'sub_id': parseInt(sub_id), 'method': method};

  fetch('https://push.litelibria.com/subscribe_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    if(styleDebug) console.log('Success:', data);
  })
  .catch((error) => {
    if(styleDebug) console.error('Error:', error);
  });
}

function push_subscribe_list(sub_id_list, method) {
	if(styleDebug) console.log("sub_token", localStorage.getItem('sub_token'));
	if(styleDebug) console.log("sub_id_list", sub_id_list);

  const data = {'sub_token':localStorage.getItem('sub_token'), 'sub_id_list': sub_id_list, 'method': method};

  fetch('https://push.litelibria.com/subscribe_list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    if(styleDebug) console.log('Success:', data);
  })
  .catch((error) => {
    if(styleDebug) console.error('Error:', error);
  });
}

function push_subscribe_all(method) {
  if(method == 'save'){
    if (document.getElementById('WebPushButtonBlock') !== null) {
      document.getElementById('WebPushSubAll').dataset.state = 'Select';
      document.getElementById('WebPushSubManual').dataset.state = '';
      document.getElementById('WebPushSubFavorites').dataset.state = '';
    }
    localStorage.setItem('WebPushMode', 'WebPushSubAll')
  }


  if(styleDebug) console.log({'sub_token':localStorage.getItem('sub_token'), 'method': method});

	if(styleDebug) console.log("sub_token", localStorage.getItem('sub_token'));

  const data = {'sub_token':localStorage.getItem('sub_token'), 'method': method};

  fetch('https://push.litelibria.com/subscribe_all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    if(styleDebug) console.log('Success:', data);
  })
  .catch((error) => {
    if(styleDebug) console.error('Error:', error);
  });
}

function push_subscribe_manual(){
  push_subscribe_all('dell')
  // push_subscribe_favorites('dell')
  
  if (document.getElementById('WebPushButtonBlock') !== null) {
    document.getElementById('WebPushSubAll').dataset.state = '';
    document.getElementById('WebPushSubManual').dataset.state = 'Select';
    document.getElementById('WebPushSubFavorites').dataset.state = '';
  }
  localStorage.setItem('WebPushMode', 'WebPushSubManual')
}

function push_subscribe_favorites(method){
  push_subscribe_all('dell')
  
  if (document.getElementById('WebPushButtonBlock') !== null) {
    document.getElementById('WebPushSubAll').dataset.state = '';
    document.getElementById('WebPushSubManual').dataset.state = '';
    document.getElementById('WebPushSubFavorites').dataset.state = 'Select';
  }
  localStorage.setItem('WebPushMode', 'WebPushSubFavorites');

  var url = config["titels_API"]+"user/favorites?session="+localStorage.getItem('PHPSESSID')+"&filter=id&limit=-1";
  fetch(url)
  .then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (dataAPI) {
		var data = dataAPI['list'];
    listSubFavor = []
    for (let i = 0; i < data.length; i++) {
      listSubFavor.push(data[i]['id'])
    }
    push_subscribe_list(listSubFavor, method)
  })
  .catch(function (error) {
    console.log('error', error)
  })
}


async function GetPublicKey(){
  var url = "https://push.litelibria.com/subscription";
  await fetch(url)
  .then(function (response) {
    return Promise.resolve(response)
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    if(styleDebug) console.log("[PublicKey] ", data);
    localStorage.setItem('applicationServerPublicKey',data.public_key);
  })
  .catch(function (error) {
    if(styleDebug) console.log('error', error)
  })
};

async function initializeUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription_data) {
    isSubscribed = !(subscription_data === null);

    if (isSubscribed) {
      if(styleDebug) console.log('User IS subscribed.');
    } else {
      if(styleDebug) console.log('User is NOT subscribed.');
    }
    updateBtn();
  });
}