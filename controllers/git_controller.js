import WidgetController from './widget_controller.js';
import { GitActionWidget } from '../widgets.js';

export class GitController extends WidgetController {
    constructor (parent_id, view_path) {
        super(parent_id, view_path);
    }
    async init () {
        await super.init(2);

        this.sub_document = {
            name : this.html.querySelector("#GitName"),
            img : this.html.querySelector("#GitImage"),
            joinDate : this.html.querySelector("#GitJoin"),
            activityPanel : this.html.querySelector("#GitActivity")
        }

        await this.loadProfile("https://api.github.com/users/RealEeveahy");
        await this.loadActivity("https://api.github.com/users/RealEeveahy/events/public");
    }
    async loadProfile(profile_url) {
        let gitProfile = await fetch(profile_url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.sub_document.name.textContent = data.login;
            this.sub_document.img.src = data.avatar_url;
            this.sub_document.joinDate.textContent = "Member since: " + (data.created_at).slice(0,10);
        })
        .catch(error => console.error('Error: ', error));
    }
    async loadActivity(activity_url)
    {
        let gitActivity = await fetch(activity_url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for(let i = 0; i < 5; i++)
            {
                new GitActionWidget(
                    this.sub_document.activityPanel,
                    data[i].type,
                    data[i].repo.name, 
                    data[i].created_at
                    );
            }
        })
        .catch(error => console.error('Error: ', error));
    }
}