const games = ["'Bee Swarm Simulator':'HTML/beeswarm.html'", 
"'Cookie Clicker':'HTML/cookie-clicker'", 
 "'2048':'HTML/2048'", 
 "'n-gon':'HTML/n-gon'", 
 "'Chrome Dino Game':'HTML/chrome-dino'",  
 "'Dadish':'HTML/Dadish'",
 "'Dadish 2':'HTML/Dadish2'",
 "'Dadish 3':'HTML/Dadish3'",
 "'Portal the Flash Version (wcs)':'Flash/emulated/portal_wcs'", 
 "'Portal 2 the Flash Version (wixgames)':'Flash/emulated/portal_at'", 
];
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.open('offline-cache').then(function(cache) {
        return cache.match('offline.html');
      });
    })
  );
});
function getModsForGame(gameTitle) {
  let mods = JSON.parse(localStorage.getItem('mods')) || {};

  if (mods[gameTitle]) {
    return mods[gameTitle];
  } else {
    return [];
  }
}
function loadGameWithMods(gameTitle, games) {
  const mods = getModsForGame(gameTitle);

  const game = games.find((game) => game.title === gameTitle);

  if (game) {
    mods.forEach((mod) => {
      // Dynamically inject and execute the mod code in the current window context
      const scriptElement = document.createElement('script');
      scriptElement.textContent = mod.code;
      document.body.appendChild(scriptElement);
    });

    // Redirect to the game HTML file path from the games array after injecting mods
    window.location.href = game.path;
  } else {
    console.error(`Game '${gameTitle}' not found in the games array.`);
  }
}
