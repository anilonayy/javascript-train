const FORM =  document.getElementById("new-course");
const TABLE_BODY = document.getElementById("table-body");

// Course constructor
function Course(title,instructor,image)
{
    this.id = new Date().getTime();
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

// UI constructor
function UI(){}

UI.prototype.clearForm = function(){ FORM.reset(); }
UI.prototype.addCourseToList = function(course){
    TABLE_BODY.innerHTML+=`
    <tr>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td> <img src="${course.image}" style="width:40px;height:40px;background:gray;padding:5px"></td>
        <td> <button class="btn btn-danger btn-sm delete">Delete</button> </td>
    </tr>
    `;
}

UI.prototype.removeCourseFromList = function(element){
    if(element.classList.contains("delete"))
    {
        element.parentElement.parentElement.remove();
        let ui = new UI();
        ui.showAlert("The course has been deleted","danger");
        Storage.removeCourseFromList()

        
    }
}
UI.prototype.showAlert = function(message,type)
{
    let html =`<div class="alert alert-${type}">${message}</div>`;
    document.querySelectorAll(".row")[0].insertAdjacentHTML("afterbegin",html);

    setTimeout(() => {
        let nodes = document.querySelectorAll(".alert");
        nodes[nodes.length-1].remove();
    }, 3000);
    
}

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
    ui.showAlert("Course has been added.","success");
    ui.clearForm();
    // show on ui  



});

TABLE_BODY.addEventListener("click",function(e)
{
    
    const ui = new UI();
    ui.removeCourseFromList(e.target);
})