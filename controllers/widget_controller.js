import { loadPartial } from "../helpers.js";

export default class WidgetController {
    constructor (parent_id, view_path) {
        this.parent_id = parent_id;
        this.view_path = view_path;
        this.parent = document.getElementById(parent_id);
    }
    async init(index = undefined) {
        const {id, element} = await loadPartial(this.parent_id, this.view_path, "content-container", index);
        this.html_id = id;
        this.html = element;

        console.log(this.html_id);
        console.log(this.html);
    }
}