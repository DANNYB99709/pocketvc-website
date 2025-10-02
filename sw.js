// Service Worker for PocketVC
const CACHE_NAME = 'pocketvc-v2';
const STATIC_CACHE = 'pocketvc-static-v2';
const DYNAMIC_CACHE = 'pocketvc-dynamic-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/blog.html',
  '/contact.html',
  '/faq.html',
  '/signup.html',
  '/privacy.html',
  '/terms.html',
  '/media/logo.png',
  '/hero.MP4',
  '/media/create.png',
  '/media/discover.png',
  '/media/connect.png',
  '/media/close.png',
  '/manifest.json',
  '/sitemap.xml',
  '/robots.txt'
];

// Cache strategies
const CACHE_STRATEGIES = {
  static: ['/media/logo.png', '/media/create.png', '/media/discover.png', '/media/connect.png', '/media/close.png'],
  dynamic: ['/hero.MP4'],
  networkFirst: ['/index.html', '/about.html', '/blog.html', '/contact.html', '/faq.html', '/signup.html']
};

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(CACHE_STRATEGIES.static)),
      caches.open(DYNAMIC_CACHE).then(cache => cache.addAll(CACHE_STRATEGIES.dynamic))
    ])
  );
  self.skipWaiting();
});

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Static assets - cache first
  if (CACHE_STRATEGIES.static.some(asset => url.pathname.includes(asset))) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
    return;
  }
  
  // Dynamic content - network first
  if (CACHE_STRATEGIES.networkFirst.some(page => url.pathname.includes(page))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Default - cache first for other requests
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (![STATIC_CACHE, DYNAMIC_CACHE].includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
