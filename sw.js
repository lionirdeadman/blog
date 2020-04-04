---
permalink: /sw.js
---

{% assign permalinks = site.pages | map: "permalink" | compact %}
{% assign urls = site.pages | map: "url" | compact %}
{% assign post_permalinks = site.posts | map: "permalink" | compact %}

var urlsToCache = 
    {{ post_permalinks | concat: permalinks | concat: urls | remove: "" | uniq | compact | join: ", " }};

var f = '/assets/favicon/';
var android = f + 'android-icon-';
var apple = f + 'apple-icon-';
var favicon = f + 'favicon-'
var ms = f + 'ms-icon-';
var p = '.png'

urlsToCache.push(
  android + '36x36' + p,
  android + '48x48' + p,
  android + '72x72' + p,
  android + '96x96' + p,
  android + '144x144' + p,
  android + '192x192' + p,
  apple + '57x57' + p,
  apple + '60x60' + p,
  apple + '72x72' + p,
  apple + '76x76' + p,
  apple + '114x114' + p,
  apple + '120x120' + p,
  apple + '144x144' + p,
  apple + '152x152' + p,
  apple + '180x180' + p,
  apple + 'precomposed' + p,
  apple.slice(0, -1) + p,
  favicon + '16x16' + p,
  favicon + '32x32' + p,
  favicon + '96x96' + p,
  ms + '70x70' + p,
  ms + '144x144' + p,
  ms + '150x150' + p,
  ms + '310x310' + p,
  '/assets/fonts/HackNerdFontComplete-Bold.ttf',
  '/assets/fonts/HackNerdFontComplete-Italic.ttf',
  '/assets/fonts/HackNerdFontComplete-Regular.ttf',
  '/assets/fonts/HackNerdFontComplete-Bold.ttf'
);

var CACHE_NAME = '{{ site.title | slugify }}-cache-v1';

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    return cache.addAll(urlsToCache);
  }).catch(function(err) {
    console.log('cache add err', err);
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// strategies from the offline cookbook by jake archibald
// https://jakearchibald.com/2014/offline-cookbook/#serving-suggestions-responding-to-requests

{% assign strategy = site.offline.strategy | default: 'cache-then-network' %}
{% if strategy == 'cache-only' %}
  self.addEventListener('fetch', function(event) {
    // If a match isn't found in the cache, the response
    // will look like a connection error
    event.respondWith(caches.match(event.request));
  });
{% elsif strategy == 'network-only' %}
  self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
    // or simply don't call event.respondWith, which
    // will result in default browser behaviour
  });
{% elsif strategy == 'cache-first-network-fallback' %}
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
{% elsif strategy == 'network-first-cache-fallback' %}
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });
{% elsif strategy == 'cache-network-race' %}
  // Promise.race is no good to us because it rejects if
  // a promise rejects before fulfilling. Let's make a proper
  // race function:
  function promiseAny(promises) {
    return new Promise((resolve, reject) => {
      // make sure promises are all promises
      promises = promises.map(p => Promise.resolve(p));
      // resolve this promise as soon as one resolves
      promises.forEach(p => p.then(resolve));
      // reject if all promises reject
      promises.reduce((a, b) => a.catch(() => b))
        .catch(() => reject(Error("All failed")));
    });
  };

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      promiseAny([
        caches.match(event.request),
        fetch(event.request)
      ])
    );
  });
{% elsif strategy == 'cache-then-network' %}
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        const { destination } = event.request;
        if (destination === 'font' || destination === 'image') {
          return cache.match(event.request.url);
        }

        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  });
{% endif %}
