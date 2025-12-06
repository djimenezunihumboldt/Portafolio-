/// <reference lib="webworker" />

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST);

// Cleanup old caches
cleanupOutdatedCaches();

// Cache Google Fonts
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache CSS and JS
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
      }),
    ],
  })
);

// Cache API requests (if any)
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Offline fallback
const OFFLINE_PAGE = '/project-bolt-sb1-afdjf5g4/offline.html';

// Handle offline navigation
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const offlineResponse = await caches.match(OFFLINE_PAGE);
        if (offlineResponse) return offlineResponse;
        const indexResponse = await caches.match('/project-bolt-sb1-afdjf5g4/index.html');
        if (indexResponse) return indexResponse;
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      })
    );
  }
});

// Skip waiting and claim clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Background sync for contact form (if needed)
// Note: Background Sync API types are not fully supported in TypeScript
self.addEventListener('sync' as keyof ServiceWorkerGlobalScopeEventMap, ((event: Event) => {
  const syncEvent = event as ExtendableEvent & { tag?: string };
  if (syncEvent.tag === 'contact-form-sync') {
    syncEvent.waitUntil(syncContactForm());
  }
}) as EventListener);

async function syncContactForm() {
  // Handle background sync for contact form submissions
  const cache = await caches.open('contact-form-pending');
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      const response = await cache.match(request);
      if (response) {
        const data = await response.json();
        // Retry sending the form
        await fetch(request, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        await cache.delete(request);
      }
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }
}

// Push notifications (optional)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Nueva actualización disponible',
    icon: '/project-bolt-sb1-afdjf5g4/icon-192.png',
    badge: '/project-bolt-sb1-afdjf5g4/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification('Daniel Jiménez Portfolio', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow('/project-bolt-sb1-afdjf5g4/')
  );
});
