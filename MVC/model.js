class coursesModel {
    constructor() {
        this.availableCourses = [];
        this.selectedCourses = [];
    }

    async fetchAvailableCourses() {
        const res = await API.getCourses();
        this.availableCourses = res;
    }
}