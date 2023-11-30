
const baseURL = 'https://pokeapi.co/api/v2/pokemon';
let offset = 0;
const limit = 10;
let currentPokemonList = [];
let favoritePokemon = [];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const favBtn = document.getElementById('favBtn');
const app = document.getElementById('app');


// Primer Fetch
fetchPokemon(`${baseURL}?offset=${offset}&limit=${limit}`);


prevBtn.addEventListener('click', function () {
    offset = Math.max(0, offset - limit);
    fetchPokemon(`${baseURL}?offset=${offset}&limit=${limit}`);
});

nextBtn.addEventListener('click', function () {
    offset += limit;
    fetchPokemon(`${baseURL}?offset=${offset}&limit=${limit}`);
});

resetBtn.addEventListener('click', function () {
    searchInput.value = '';
    offset = 0;
    fetchPokemon(`${baseURL}?offset=${offset}&limit=${limit}`);
});

// Cargar Pokemon del localStorage
const storedFavorites = localStorage.getItem('favoritePokemon');
if (storedFavorites) {
    favoritePokemon = JSON.parse(storedFavorites);
}

favBtn.addEventListener("click",function(){
    window.open("/PaginaFavoritos.html","Favoritos");
})

// Eventos
searchBtn.addEventListener('click', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const urlnueva=`${baseURL}/${searchTerm}`;
    currentPokemonList = [];
    fetchPokemon(urlnueva);   
});

// Funcion de fetch y mostrar Pokémon
async function fetchPokemon(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if(data.results!=undefined){
            currentPokemonList = data.results;
            displayPokemon();
        }else{
            currentPokemonList.unshift(data);
            displayPokemonBuscado();
        }
       
        
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

// Funcion de mostrar pokemon
function displayPokemon() {
    app.innerHTML = '';
    currentPokemonList.forEach(pokemon => {      
        console.log(pokemon.url.split('/')[6])
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';

        const pokemonImage = document.createElement('img');
        
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
        pokemonImage.alt = pokemon.name;

        const pokemonName = document.createElement('p');
        pokemonName.textContent = pokemon.name;

        const addToFavoritesBtn = document.createElement('button');
        addToFavoritesBtn.setAttribute("id","btnFavorito");
    
        addToFavoritesBtn.textContent = 'Add to Favorites';

        // Asegurar de que el POkemon esta en Favoritos
        if (favoritePokemon.includes(pokemon.name)) {
            addToFavoritesBtn.textContent = 'Remove from Favorites';
        }

        addToFavoritesBtn.addEventListener('click', function () {
            toggleFavorite(pokemon.name);
        });

        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(addToFavoritesBtn);

        app.appendChild(pokemonCard);
    });
}

function displayPokemonBuscado() {
    app.innerHTML = '';
    currentPokemonList.forEach(pokemon => {
        //console.log(pokemon["id"])
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';

        const pokemonImage = document.createElement('img');
        
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon["id"]}.png`;
        pokemonImage.alt = pokemon.name;

        const pokemonName = document.createElement('p');
        pokemonName.textContent = pokemon.name;

        const addToFavoritesBtn = document.createElement('button');
        addToFavoritesBtn.setAttribute("id","btnFavorito");
      
        addToFavoritesBtn.textContent = 'Add to Favorites';

        // Asegurar de que el POkemon esta en Favoritos
        if (favoritePokemon.includes(pokemon.name)) {
            addToFavoritesBtn.textContent = 'Remove from Favorites';
        }

        addToFavoritesBtn.addEventListener('click', function () {
            toggleFavorite(pokemon.name);
        });


        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(addToFavoritesBtn);

        app.appendChild(pokemonCard);
    });
}


// Function para gestionar el Pokemon
function toggleFavorite(pokemonName) {
    const index = favoritePokemon.indexOf(pokemonName);
    if (index === -1) {
        // Agregar a favs
        favoritePokemon.push(pokemonName);
    } else {
        // Remover de Favs
        favoritePokemon.splice(index, 1);
    }

    // guardar actualizaciones en localStorage
    localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon));

    

    // Recarg
    displayPokemon();
}

