export default class CardWidget {
    constructor(parent) {
        this.wrapper = document.createElement("div");
        this.wrapper.className = "inner-content";

        document.getElementById(parent).appendChild(this.wrapper);
    } 
}

export class GitActionWidget extends CardWidget{ 
    constructor(parent, action, repoName, date) {
        super(parent);
        const newAction = document.createElement("p");
        newAction.textContent = action.slice(0,-5) + " in '" + repoName + "' on " + date.slice(0,10);

        this.wrapper.appendChild(newAction);
    }
}

export class ArtistWidget extends CardWidget {
    constructor(parent, name, location, genres) {
        super(parent);

        const nameField = document.createElement("p");
        nameField.textContent = name;

        const locationField = document.createElement("p");
        locationField.textContent = "🏳 " + location;

        const genreField = document.createElement("p");
        genreField.textContent = genres;

        this.wrapper.appendChild(nameField);
        this.wrapper.appendChild(locationField);
        this.wrapper.appendChild(genreField);
    }
}