// cargar favoritos en la carpeta de localStorage

let currentPokemonList = [];
let favoritePokemon = [];
const baseURL = 'https://pokeapi.co/api/v2/pokemon';
let storedFavorites = localStorage.getItem('favoritePokemon');
console.log(storedFavorites)
let array = JSON.parse(storedFavorites);

const favBnt = document.getElementById("btnFavorito");

array.forEach(element => {
    let urlnueva = baseURL + "/" + element;
    console.log(urlnueva);
    fetchPokemon(urlnueva)
});


if (storedFavorites) {
    favoritePokemon = JSON.parse(storedFavorites);
}




// Funcion de fetch y mostrar Pokémon
async function fetchPokemon(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        currentPokemonList.unshift(data);
        displayPokemonBuscado();



    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
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
        addToFavoritesBtn.textContent = 'Add to Favorites';
        addToFavoritesBtn.setAttribute("id", "btnFavorito");


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
    displayPokemonBuscado();
}