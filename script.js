import { GitActionWidget, ArtistWidget } from './widgets.js';

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
        current : document.getElementById("weatherCurrent"),
        day2 : document.getElementById("weatherDay2"),
        day3 : document.getElementById("weatherDay3")
    },
    cat : {
        img : document.getElementById("RandomCat"),
        btn : document.getElementById("CatButton")
    }
}

async function fetchArtists() {
    const mb_root = "https://musicbrainz.org/ws/2/";
    const args = "?inc=aliases&fmt=json";

    const artistURLs = [
        "artist/f4b6e451-5dce-4842-a555-f793892299b3", //Jane Remover
        "artist/6d8165b1-3ac3-402f-9c46-72451a4154f9", //SBC
        "artist/a3c33579-c9ba-4ef4-b852-b33f15bb4045" //gfx3c
    ]

    for (const a_url of artistURLs)
    {
        await loadArtist(mb_root + a_url + args);
        await sleep(1200);
    }
}

async function loadArtist(url) {
    let a_info = await fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        new ArtistWidget(
            "MusicContainer",
            data.name,
            data.area.name,
            "NONE YET"
        )
    })
    .catch(error => console.error('Error: ', error));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getFormatDate(dateObj){
    let day = dateObj.getDate();
    let month = dateObj.getMonth() +1;
    return day+"/"+month
}

async function getGitInfo(){
    let gitProfile = await fetch("https://api.github.com/users/RealEeveahy")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        dom.github.name.innerHTML = data.login;
        dom.github.img.src = data.avatar_url;
        dom.github.joinDate.innerHTML = "Member since: " + (data.created_at).slice(0,10);
    })
    .catch(error => console.error('Error: ', error));

    let gitActivity = await fetch("https://api.github.com/users/RealEeveahy/events/public")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for(let i = 0; i < 5; i++)
        {
            new GitActionWidget(
                "GitActivity",
                data[i].type,
                data[i].repo.name, 
                data[i].created_at
                );
        }
    })
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
    let perthWeather = await fetch("https://goweather.xyz/weather/Perth")
    .then(response => response.json())
    .then(data => {
        let today = new Date();

        dom.weather.current.innerHTML =  getFormatDate(today) +": "+ data.temperature;
        dom.weather.day2.innerHTML = getFormatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000)) +": "+ data.forecast[0].temperature.slice(1);
        dom.weather.day3.innerHTML = getFormatDate(new Date(today.getTime() + 48 * 60 * 60 * 1000)) +": "+ data.forecast[1].temperature.slice(1);
    })
    .catch(error => console.error('Error: ', error));
}

async function fetchCat() {
    // request
    const newCat = await fetch('https://cataas.com/cat');
    // store the request as a blob (binary data)
    const blob = await newCat.blob();
    // get a url from the blob, since the image is at the url itself
    return URL.createObjectURL(blob);
}

async function setCat() {
    dom.cat.img.src = await fetchCat();
    console.log("got a new cat");
}

document.addEventListener("DOMContentLoaded", () => {
    setCat();
    getGitInfo();
    getPokemonInfo();
    getWeatherInfo();

    fetchArtists();

    dom.cat.btn.addEventListener("click", setCat);
});