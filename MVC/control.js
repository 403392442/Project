class coursesControl {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
        this.setUpSelectCourse();
    }

    async init() {
        await this.model.fetchAvailableCourses().then(() => {
            this.view.renderAvailableCourses(this.model.availableCourses, this.model.selectedCourses)
        })
    }

    setUpSelectCourse() {
        this.view.availableCoursesList.addEventListener('click', (e) => {
            let target = e.target;
            if(target.tagName === 'LI'){
                target = target.parentNode;
            }

            if(target.classList.contains('course-item')){
                if(target.classList.contains('selected')){
                    target.classList.remove('selected');
                    this.model.selectedCourses = this.model.selectedCourses.filter(course => course !== target);
                } else {
                    target.classList.add('selected');
                    this.model.selectedCourses.push(target);
                }
                
            }
            this.view.renderFooter(this.model.selectedCourses);
        })
    }
}

const app = new coursesControl(new coursesModel(), new coursesView());