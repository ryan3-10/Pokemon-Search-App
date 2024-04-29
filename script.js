const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const pokemonName = document.getElementById("pokemon-name");
const pokemeonId = document.getElementById("pokemon-id");
const weightSpan = document.getElementById("weight");
const heightSpan = document.getElementById("height");
const typesContainer = document.getElementById("types");
const hpSpan = document.getElementById("hp");
const attackSpan = document.getElementById("attack");
const defenseSpan = document.getElementById("defense");
const specialAttackSpan = document.getElementById("special-attack");
const specialDefenseSpan = document.getElementById("special-defense");
const speedSpan = document.getElementById("speed");
const imageContainer = document.getElementById("image-container");

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    searchPokemon(searchInput.value);
});

const searchPokemon = async (input) => {
    const toSearchFor = input.toLowerCase();
    try {
        const response = await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${toSearchFor}`
        );
        const data = await response.json();
        updatePage(data);
    } catch {
        alert("Pokémon not found");
        return
    }
}

const updatePage = (input) => {
    const { name, id, height, weight, sprites, stats, types } = input;

    // Update image
    const imageUrl = sprites.front_default;
    imageContainer.innerHTML = `<img id="sprite" src="${imageUrl}" alt="${imageUrl}">`

    // Update types container
    typesContainer.innerHTML = "";
    const typeColors = {
        electric: "yellow",
        steel: "grey",
        water: "blue",
        grass: "green",
        fire: "red"
    }

    for (const type of types) {
        const name = type.type.name;
        const newSpan = document.createElement("span");
        newSpan.textContent = name.toUpperCase();
        newSpan.classList.add("type-span");
        newSpan.style.backgroundColor = typeColors[name] || "white";
        typesContainer.appendChild(newSpan);
    }

    // Update stats
    let statKey = {};
    stats.forEach((stat) => statKey[stat.stat.name] = stat.base_stat);
    pokemonName.textContent = name.toUpperCase();
    pokemeonId.textContent = id;
    weightSpan.textContent = weight
    heightSpan.textContent = height;
    hpSpan.textContent = statKey.hp;
    attackSpan.textContent = statKey.attack;
    defenseSpan.textContent = statKey.defense;
    specialAttackSpan.textContent = statKey["special-attack"];
    specialDefenseSpan.textContent = statKey["special-defense"];
    speedSpan.textContent = statKey.speed;
}
