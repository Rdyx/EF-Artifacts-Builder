// https://stackoverflow.com/a/54008287
// To make the service worker skip waiting phase to be able to see last update without closing tabs or app

self.addEventListener('message', event => {
    if (!event.data) {
        return;
    }
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});