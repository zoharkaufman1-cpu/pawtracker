// PawTracker Service Worker
const CACHE = 'pawtracker-v1';

// Install
self.addEventListener('install', e => {
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', e => {
  self.clients.claim();
});

// Push notification received
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'PawTracker 🐾';
  const options = {
    body: data.body || 'עדכון חדש!',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [200, 100, 200],
    dir: 'rtl',
    lang: 'he',
    data: { url: data.url || '/' }
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

// Click on notification → open app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow(e.notification.data.url || '/');
    })
  );
});
