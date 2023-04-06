const CACHE_PREFIX = 'Kaamira';
const CACHE_VERSION_MAJOR = '2';
const CACHE_VERSION_MINOR = '0';
const CACHE_VERSION_PATCH = '0';

const staticCacheName = 's-'+CACHE_PREFIX+'-'+CACHE_VERSION_MAJOR+'.'+CACHE_VERSION_MINOR+'.'+CACHE_VERSION_PATCH;
const dynamicCacheName = 'd-'+CACHE_PREFIX+'-'+CACHE_VERSION_MAJOR+'.'+CACHE_VERSION_MINOR;
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

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  let mess = JSON.parse(event.data.text())

  const title = mess["title"]
  const options = {
    body: mess["body"],
    icon: mess["icon"],
    badge: mess["badge"],
    image: mess["image"],
    tag: mess["id"]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  console.log(`[Service Worker] Notification event id. "${event.notification.tag}"`);

  event.notification.close();

  event.waitUntil(
    clients.openWindow(`/release/${event.notification.tag}`)
  );
  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        includeUncontrolled: true,
      });

      let chatClient;

      // Let's see if we already have a chat window open:
      for (const client of allClients) {
        const url = new URL(client.url);

        if (url.pathname === `/release/${event.notification.tag}`) {
          // Excellent, let's use it!
          client.focus();
          chatClient = client;
          break;
        }
      }

      // If we didn't find an existing chat window,
      // open a new one:
      if (!chatClient) {
        chatClient = await clients.openWindow(`/release/${event.notification.tag}`);
      }

      // Message the client:
      chatClient.postMessage("New chat messages!");
    })()
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
  const applicationServerPublicKey = localStorage.getItem('applicationServerPublicKey');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(newSubscription) {
      // TODO: Send to application server
      console.log('[Service Worker] New subscription: ', newSubscription);
    })
  );
});

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName)

  await fetch("/filesToCache.json").then(function(response){
    if(response && response.ok){
      return response.json()
    }
    throw new Error("Failed to load files to cache for app shell")
  })
  .then(function(filesToCache){
    console.log('[ServiceWorker] Caching app shell', filesToCache);
    return cache.addAll(filesToCache);
  })
  .catch(function(error){
    console.error(error)
  })
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const {request} = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})

self.addEventListener('message', event => {
	if (event.data === 'skipWaiting') return skipWaiting();
});


async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    if (request.url.substr(-5) != '.m3u8' && request.url.substr(-3) != '.ts' && request.destination != 'image' && request.method != 'POST' && request.url != 'https://apis.google.com/js/api.js') await cache.put(request, response.clone())
		return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? new Response("Network error happened", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    })
  }
}