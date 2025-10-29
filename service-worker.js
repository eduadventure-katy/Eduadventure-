self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("edu-cache").then((cache) => {
      return cache.addAll([
        "index.html",
        "tutorials.html",
        "videos.html",
        "practice.html",
        "quiz.html",
        "challenge.html",
        "chat.html",
        "profile.html",
        "css/style.css",
        "js/script.js"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
