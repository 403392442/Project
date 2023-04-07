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

        const footerForm = this.createFooter(selectedCoursesArray)[1];
        this.totalCredits.append(footerForm);
    }

    renderFooter(selectedCoursesArray) {
        const [totalCredit, footerForm] = this.createFooter(selectedCoursesArray);
        if (totalCredit > 18) {
            return false;
        } else {
            this.totalCredits.replaceChildren(footerForm);
            return true;
        }
    }

    renderSelectedCourses(selectedCoursesArray) {
        if(selectedCoursesArray.length === 0) {
            this.selectedCoursesList.innerHTML = '';
        }
        console.log(selectedCoursesArray);
        selectedCoursesArray.forEach(course => {
            this.selectedCoursesList.append(course);
        });


        // this.selectedCoursesList.replaceChildren(selectedCoursesArray);
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
        const totalCredits = this.calculateTotalCredits(selectedCoursesArray);
        
        const submitCourses = document.createElement('div');
        submitCourses.classList.add('submit-courses-div');

        const showTotalCredits = document.createElement('span');
        showTotalCredits.innerText = `Total Credits: ${totalCredits}`;

        const submitCoursesBtn = document.createElement('button');
        submitCoursesBtn.classList.add('submit-courses-btn');
        submitCoursesBtn.innerText = 'Select';

        submitCourses.append(showTotalCredits);
        submitCourses.append(submitCoursesBtn);

        return [totalCredits, submitCourses];
    }

    calculateTotalCredits(selectedCoursesArray) {
        let totalCredits = 0;
        totalCredits = selectedCoursesArray.reduce((acc, curr) => {
            const courseCredit = curr.getAttribute('course-credit');
            curr = parseInt(courseCredit);
            return acc + curr;
        }, 0);

        return totalCredits;
    }
}