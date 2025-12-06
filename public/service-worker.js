// const STATIC_CACHE_NAME = 'static-cache-v1';
// const DYNAMIC_CACHE_NAME = 'dynamic-api-cache-v1';
// const CACHE_EXPIRATION_TIME = 10 * 60 * 1000; // 10 dakika
// const MAX_CACHE_ITEMS = 50;
// const MAX_STORAGE_LIMIT = 200 * 1024 * 1024; // 200 MB

// // Cache temizleme fonksiyonu
// const cleanCache = async (cacheName, maxItems) => {
//   const cache = await caches.open(cacheName);
//   const keys = await cache.keys();
//   if (keys.length > maxItems) {
//     await cache.delete(keys[0]); // Eski öğeyi sil
//     return cleanCache(cacheName, maxItems);
//   }
// };

// // Depolama kontrolü ve otomatik temizleme
// const checkAndCleanStorage = async () => {
//   if ('storage' in navigator && 'estimate' in navigator.storage) {
//     const quota = await navigator.storage.estimate();
//     const used = quota.usage || 0;

//     console.log(`Kullanılan Depolama: ${(used / 1024 / 1024).toFixed(2)} MB`);
//     console.log(`Toplam Kota: ${(quota.quota / 1024 / 1024).toFixed(2)} MB`);

//     if (used > MAX_STORAGE_LIMIT) {
//       console.log('Depolama kotası aşıldı, eski öğeler temizleniyor...');
//       const cacheNames = await caches.keys();
//       for (const cacheName of cacheNames) {
//         const cache = await caches.open(cacheName);
//         const keys = await cache.keys();
//         if (keys.length > 0) {
//           await cache.delete(keys[0]); // En eski öğeyi sil
//         }
//       }
//     }
//   }
// };

// // Install event: Statik dosyaları önbelleğe al
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(STATIC_CACHE_NAME).then((cache) => {
//       return cache.addAll(['/']);
//     })
//   );
// });

// // Activate event: Eski cache'leri temizle
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (![STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME].includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// // Fetch event
// self.addEventListener('fetch', (event) => {
//   const requestUrl = new URL(event.request.url);

//   // API için dinamik cache
//   if (requestUrl.pathname.startsWith('/api/')) {
//     event.respondWith(
//       caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
//         return cache.match(event.request).then((cachedResponse) => {
//           const now = Date.now();

//           if (cachedResponse) {
//             const cachedTime = new Date(cachedResponse.headers.get('date')).getTime();
//             if (now - cachedTime < CACHE_EXPIRATION_TIME) {
//               return cachedResponse;
//             }
//           }

//           return fetch(event.request).then((networkResponse) => {
//             if (networkResponse.status === 200) {
//               cache.put(event.request, networkResponse.clone());
//               cleanCache(DYNAMIC_CACHE_NAME, MAX_CACHE_ITEMS);
//               checkAndCleanStorage(); // Depolama kontrolü
//             }
//             return networkResponse;
//           });
//         });
//       })
//     );
//   }

//   // Statik dosyalar için cache-first
//   else {
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         return fetch(event.request).then((networkResponse) => {
//           return caches.open(STATIC_CACHE_NAME).then((cache) => {
//             cache.put(event.request, networkResponse.clone());
//             checkAndCleanStorage(); // Depolama kontrolü
//             return networkResponse;
//           });
//         });
//       })
//     );
//   }
// });
