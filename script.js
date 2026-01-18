const dom = {
    github : {
        name : document.getElementById("GitName"),
        img : document.getElementById("GitImage"),
        joinDate : document.getElementById("GitJoin")
    },
    pokemon : {
        name : document.getElementById("PkmnName"),
        img : document.getElementById("PkmnImage")
    },
    weather : {
        current : document.getElementById("output")
    }
}

async function getGitInfo(){
    let gitProfile = await fetch("https://api.github.com/users/RealEeveahy")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        dom.github.name.innerHTML = data.login;
        dom.github.img.src = data.avatar_url;
        dom.github.joinDate.innerHTML = "Member since: " + data.created_at;
    })
    .catch(error => console.error('Error: ', error));
}

async function getPokemonInfo(){
    let favPkmn = await fetch("https://pokeapi.co/api/v2/pokemon/reuniclus")
    .then(response => response.json())
    .then(data => {
        dom.pokemon.name.innerHTML = data.name.toUpperCase();
        dom.pokemon.img.src = data.sprites.other?.["official-artwork"].front_default;
    })
    .catch(error => console.error('Error: ', error));
}

async function getWeatherInfo() {
    let perthWeather = await fetch("https://goweather.xyz/weather/Perth");
    let data = await perthWeather.json();
    dom.weather.current.innerHTML= "Perth Temperature: " + data.temperature;
}

getGitInfo();
getPokemonInfo();
getWeatherInfo();