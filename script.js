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

class GitActionWidget {
    constructor(action, repoName, date) {
        // this.action = action;
        // this.repoName = repoName;
        // this.date = date;

        const gitDiv = document.getElementById("GitActivity");
        const newAction = document.createElement("p");
        newAction.textContent = action.slice(0,-5) + " in '" + repoName + "' on " + date.slice(0,10);

        gitDiv.appendChild(newAction);
    }
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

        dom.weather.current.innerHTML =  getFormatDate(today) +": "+ data.temperature.slice(1);
        dom.weather.day2.innerHTML = getFormatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000)) +": "+ data.forecast[0].temperature.slice(1);
        dom.weather.day3.innerHTML = getFormatDate(new Date(today.getTime() + 48 * 60 * 60 * 1000)) +": "+ data.forecast[1].temperature.slice(1);
    })
    .catch(error => console.error('Error: ', error));
}

async function fetchCat() {
    const newCat = await fetch('https://cataas.com/cat');
    const blob = await newCat.blob();
    return URL.createObjectURL(blob);
}

async function setCat() {
    dom.cat.img.src = await fetchCat();
    console.log("got a new cat");
}

setCat();
getGitInfo();
getPokemonInfo();
getWeatherInfo();

dom.cat.btn.addEventListener("click", setCat)