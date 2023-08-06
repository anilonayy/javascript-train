const FORM =  document.getElementById("new-course");
const TABLE_BODY = document.getElementById("table-body");

class Course{
    constructor(title,instructor,image)
    {
        this.id = new Date().getTime();
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

class UI{
    addCourseToList(course)
    {
        TABLE_BODY.innerHTML+=`
        <tr>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td> <img src="${course.image}" style="width:40px;height:40px;background:gray;padding:5px"></td>
            <td> <button class="btn btn-danger btn-sm delete" item-id="${course.id}" >Delete</button> </td>
        </tr>
        `;
    }

    removeCourseFromList(element)
    {
        if(element.classList.contains("delete"))
        {
            element.parentElement.parentElement.remove();
            let ui = new UI();
            ui.showAlert("The course has been deleted","danger");
        }
    }

    clearForm()
    {
        FORM.reset();
    }

    showAlert(message,type)
    {
        let html =`<div class="alert alert-${type}">${message}</div>`;
        document.querySelectorAll(".row")[0].insertAdjacentHTML("afterbegin",html);

        setTimeout(() => {
            let nodes = document.querySelectorAll(".alert");
            nodes[nodes.length-1].remove();
        }, 3000);
    }
};

class Storage{
    static getCourses(){
        let courses = [];

        if(localStorage.getItem("courses") !== null)
        {
            courses = JSON.parse(localStorage.getItem("courses"));
        }

        return courses;
    }

    static displayCourses()
    {
        const courses = this.getCourses();

        courses.forEach(item => {
            let ui = new UI();
            ui.addCourseToList(item);
        })
    }

    static addCourse(course)
    {
        const courses = this.getCourses();
        courses.push(course);

        localStorage.setItem("courses",JSON.stringify(courses));
    }

    static deleteCourse(id)
    {
        let courses = this.getCourses();
        courses = courses.filter(item => item.id != id);
        localStorage.setItem("courses",JSON.stringify(courses));
    }
}


document.addEventListener("DOMContentLoaded",Storage.displayCourses())

FORM.addEventListener("submit",function(e){
    e.preventDefault();

    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    // create course object
    const course = new Course(title,instructor,image);
    const ui = new UI();

    if(title === "" || instructor === '' || image === '' )
    {
        ui.showAlert("Please complete the form.","warning");
        return;
    }
    

    ui.addCourseToList(course);
    // save to local storage
    Storage.addCourse(course);
    ui.showAlert("Course has been added.","success");
    ui.clearForm();
    // show on ui  



    console.log(title,instructor,image);
});

TABLE_BODY.addEventListener("click",function(e)
{
    
    const ui = new UI();
    Storage.deleteCourse(e.target.getAttribute("item-id"));
    ui.removeCourseFromList(e.target);
})

