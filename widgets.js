export default class CardWidget {
    constructor(parent) {
        this.wrapper = document.createElement("div");
        this.wrapper.className = "inner-content";

        parent.appendChild(this.wrapper);
    } 
}

export class GitActionWidget extends CardWidget{ 
    constructor(parent, action, repoName, date) {
        super(parent);
        this.description = document.createElement("p");
        this.description.textContent = action.slice(0,-5) + " in '" + repoName + "' on " + date.slice(0,10);
        this.wrapper.appendChild(this.description);
    }
}

export class ArtistWidget extends CardWidget {
    constructor(parent, name, location, genres) {
        super(parent);

        const nameField = document.createElement("p");
        nameField.textContent = name;
        this.wrapper.appendChild(nameField);

        if(location !== "") {
            const locationField = document.createElement("p");
            locationField.textContent = "🏳 " + location;
            this.wrapper.appendChild(locationField);
        }

        const genreField = document.createElement("p");
        genreField.textContent = genres;
        this.wrapper.appendChild(genreField);
    }
}