class coursesControl {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
        this.setUpSelectCourse();
    }

    async init() {
        await this.model.fetchAvailableCourses().then(() => {
            this.view.renderAvailableCourses(this.model.availableCourses, this.model.selectedCourses);
            this.setUpSubmitCourses();
        })
    }

    setUpSelectCourse() {
        this.view.availableCoursesList.addEventListener('click', (e) => {
            let target = e.target;
            if (target.tagName === 'LI') {
                target = target.parentNode;
            }

            if (target.classList.contains('course-item')) {
                if (target.classList.contains('selected')) {
                    target.classList.remove('selected');
                    this.model.selectedCourses = this.model.selectedCourses.filter(course => course !== target);
                } else {
                    target.classList.add('selected');
                    this.model.selectedCourses.push(target);
                }

            }

            if (!this.view.renderFooter(this.model.selectedCourses)) {
                alert('You can only choose up to 18 credits in one semester.')
                target.classList.remove('selected');
                this.model.selectedCourses = this.model.selectedCourses.filter(course => course !== target);
            }
            this.setUpSubmitCourses();
        })
    }

    setUpSubmitCourses() {
        const submitBtn = document.querySelector('.submit-courses-btn');
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const totalCredit = this.view.calculateTotalCredits(this.model.selectedCourses);
            const confirmation = confirm(`You have selected ${totalCredit} credits, Once you submit, you can't change your selection. Are you sure?`);
            if (confirmation) {
                submitBtn.setAttribute('disabled', 'true');
                this.view.renderSelectedCourses(this.model.selectedCourses);
            }
        })
    }
}

const app = new coursesControl(new coursesModel(), new coursesView());