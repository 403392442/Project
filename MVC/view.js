class coursesView {
    constructor() {
        this.availableCoursesList = document.querySelector('.available-courses-list');
        this.selectedCoursesList = document.querySelector('.selected-courses-list');
        this.totalCredits = document.querySelector('.total-credits');
    }

    renderAvailableCourses(allCoursesArray, selectedCoursesArray) {

        console.log(allCoursesArray)

        allCoursesArray.forEach(course => {
            const courseItem = this.createCourseItem(course);
            this.availableCoursesList.append(courseItem);
        });

        const footerForm = this.createFooter(selectedCoursesArray);
        this.totalCredits.append(footerForm);
    }

    renderFooter(selectedCoursesArray) {
        const footerForm = this.createFooter(selectedCoursesArray);
        this.totalCredits.replaceChildren(footerForm);
    }

    createCourseItem(course) {
        // set up course class
        const courseItem = document.createElement('ul');
        courseItem.classList.add('course-item');
        if(course.required){
            courseItem.classList.add('required');
        } 

        // set up course attributes
        courseItem.setAttribute('course-id', course.courseId);
        courseItem.setAttribute('course-credit', course.credit);
        courseItem.setAttribute('course-name', course.courseName);

        // set up course content
        const courseName = document.createElement('li');
        courseName.innerText = `${course.courseName}`;

        const courseType = document.createElement('li');
        if(course.required){
            courseType.innerText = 'Course Type: Compulsory';
        } else {
            courseType.innerText = 'Course Type: Elective';
        }

        const courseCredit = document.createElement('li');
        courseCredit.innerText = `Course Credit: ${course.credit}`;

        // append course content to course class
        courseItem.append(courseName);
        courseItem.append(courseType);
        courseItem.append(courseCredit);

        return courseItem;
    }

    createFooter(selectedCoursesArray) {
        let totalCredits = 0;
        totalCredits = selectedCoursesArray.reduce((acc, curr) => {
            const courseCredit = curr.getAttribute('course-credit');
            curr = parseInt(courseCredit);
            return acc + curr;
        }, 0);
        const submitCoursesForm = document.createElement('form');
        submitCoursesForm.classList.add('submit-courses-form');

        const showTotalCredits = document.createElement('span');
        showTotalCredits.innerText = `Total Credits: ${totalCredits}`;

        const submitCoursesBtn = document.createElement('button');
        submitCoursesBtn.classList.add('submit-courses-btn');
        submitCoursesBtn.innerText = 'Select';

        submitCoursesForm.append(showTotalCredits);
        submitCoursesForm.append(submitCoursesBtn);

        return submitCoursesForm;
    }
}