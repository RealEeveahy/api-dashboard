import { GitActionWidget, ArtistWidget } from './widgets.js';
import * as utils from './helpers.js';
import { GitController } from './controllers/git_controller.js';

const dom = {
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
    const args = "?inc=aliases+genres&fmt=json";

    const artistURLs = [
        "artist/f4b6e451-5dce-4842-a555-f793892299b3", //Jane Remover
        "artist/6d8165b1-3ac3-402f-9c46-72451a4154f9", //SBC
        "artist/7f423ed9-a2d4-4a2b-8de7-c07180c7bc94", //tictacto
        "artist/a3c33579-c9ba-4ef4-b852-b33f15bb4045", //gfx3c
        "artist/81917661-c863-4887-a42a-ce569aa73069", //gingerbee
        "artist/f3bc253c-9bb7-40b6-9057-5524d69b64ec", //kfc murder chicks
        "artist/f7dfbb53-8e55-4eb7-a12b-76d452c89fb3", //diet tea other cola
        "artist/1e79565e-60d5-498d-aa73-fa24d9065df1", //julie
        "artist/f9133036-ab3d-4e97-bd11-7a2c98ad148a" //death grips
    ]

    for (const a_url of artistURLs)
    {
        await loadArtist(mb_root + a_url + args);
        await utils.sleep(1200);
    }
}

async function loadArtist(url) {
    let a_info = await fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let genres = new Map();
        (data.genres).forEach(element => {
            genres.set(element.name, element.count);
        });

        let genreSummary = utils.getTopElements(genres,3);

        new ArtistWidget(
            "MusicContainer",
            ((data.name ?? data?.["sort-name"]) ?? data.aliases[0].name ) ?? "Name error.",
            data.area!=null ? data.area.name : "",
            genreSummary
        )
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
    let perthWeather = await fetch("https://goweather.xyz/weather/Perth")
    .then(response => response.json())
    .then(data => {
        let today = new Date();

        dom.weather.current.innerHTML =  utils.getFormatDate(today) +": "+ data.temperature;
        dom.weather.day2.innerHTML = utils.getFormatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000)) +": "+ data.forecast[0].temperature;
        dom.weather.day3.innerHTML = utils.getFormatDate(new Date(today.getTime() + 48 * 60 * 60 * 1000)) +": "+ data.forecast[1].temperature;
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

    const git = new GitController("body", "views/git_panel.html");
    git.init();

    getPokemonInfo();
    getWeatherInfo();

    //fetchArtists();

    utils.loadPartial("body", "views/box.html", "box");
    utils.loadPartial("body", "views/box.html", "box");

    dom.cat.btn.addEventListener("click", setCat);
});