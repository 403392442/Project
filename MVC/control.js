class coursesControl {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    async init() {
        await this.model.fetchAvailableCourses().then(() => {
            this.view.renderAvailableCourses(this.model.availableCourses)
        } 
        )
    }
}

const app = new coursesControl(new coursesModel(), new coursesView());