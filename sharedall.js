const games = ["'Bee Swarm Simulator':'HTML/beeswarm.html'", 
"'Cookie Clicker':'HTML/cookie-clicker'", 
 "'2048':'HTML/2048'", 
 "'n-gon':'HTML/n-gon'", 
 "'Chrome Dino Game':'HTML/chrome-dino'",  
 "'Dadish':'HTML/Dadish'",
 "'Dadish 2':'HTML/Dadish2'",
 "'Dadish 3':'HTML/Dadish3'",
 "'Portal the Flash Version (wcs)':'Flash/emulated/portal_wcs'", 
 "'Portal 2 the Flash Version (wixgames)':'Flash/emulated/portal_at'", "'Super Mario Bros 63 (Unofficial Flash)':'Flash/emulated/smb63'", "'The Impossible Quiz':'Flash/emulated/tiq/index.html'", "'Cubefield':'Flash/emulated/cubefield'", "'Run 3':'Flash/emulated/run3'",
               "'Play this On Max Volume': 'HTML/playthisonmaxvolume'"
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
function loadGameWithMods(gameTitle, gamesArray) {
  const mods = getModsForGame(gameTitle);

  console.log('Searching for game:', gameTitle);
  console.log('All Games:', gamesArray);

  const game = gamesArray.find(game => game.includes(gameTitle));

  if (game) {
    const [foundGameTitle, path] = game.split(":");

    const iframe = document.createElement('iframe');
    iframe.style.width = "100%"; // Set the width of the iframe to 100%
    iframe.style.height = "100%"; // Set the height of the iframe to 100%
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    document.body.appendChild(iframe);

    iframe.onload = () => {
      mods.forEach((mod) => {
        const scriptElement = iframe.contentDocument.createElement('script');
        scriptElement.textContent = mod.code;
        iframe.contentDocument.body.appendChild(scriptElement);
      });

      console.log('Game found:', foundGameTitle);
      console.log('Mods:', mods);
    };

    iframe.src = path.replace(/'/g, '').replace(/'/g, '').trim(); // Trim any leading or trailing spaces and remove extra quotes
  } else {
    console.error(`Game '${gameTitle}' not found in the Games array.`);
  }
}

function addCustomGame(customGameCode) {
  let customGames = JSON.parse(localStorage.getItem('customGames')) || [];

  const newGameID = Date.now(); // Generate a unique ID for the new custom game
  customGames.push({ id: newGameID, code: customGameCode });

  localStorage.setItem('customGames', JSON.stringify(customGames));

  console.log(`New custom game with ID ${newGameID} added.`);
}

function loadCustomGames() {
  const customGames = JSON.parse(localStorage.getItem('customGames')) || [];

  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML = '';

  if (customGames.length > 0) {
    customGames.forEach(game => {
      const gameElement = document.createElement('div');
      gameElement.innerHTML = game.code;

      gameContainer.appendChild(gameElement);
    });
  } else {
    console.log('No custom games found.');
  }
}

// Call loadCustomGames() on page load
document.addEventListener('DOMContentLoaded', function() {
  loadCustomGames();
});

function saveCustomGame() {
  const customGameCode = document.getElementById('customGameCode').value;
  if (customGameCode.trim() !== '') {
    addCustomGame(customGameCode);
    loadCustomGames(); // Reload the list of custom games
  } else {
    console.error('Cannot save an empty custom game.');
  }
}


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'q') {
        event.preventDefault();
        event.stopPropagation();
        return false
    }
});
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'w') {
        event.preventDefault();
    }
});