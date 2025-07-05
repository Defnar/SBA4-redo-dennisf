const form = document.getElementById("form");
const taskName = document.getElementById("task-name");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const updateButton = document.getElementById("update-button");
const statusFilter = document.getElementById("status-filter");
const categoryFilter = document.getElementById("category-filter");
const taskContainer = document.getElementById("task-container");

let fullTaskList = JSON.parse(localStorage.getItem("fullTaskList")) || [];

function saveData() {
    localStorage.setItem("fullTaskList", JSON.stringify(fullTaskList));
}


function Task(taskName, category, deadline) {
    this.name = taskName;
    this.category = category;
    this.deadline = deadline;
}



form.addEventListener("submit", (event) =>{
    event.preventDefault();
    if (taskName.validity.valid && category.validity.valid && deadline.validity.valid) {
        let newTask = Task(taskName.value, category.value, deadline.value);
        fullTaskList.push(newTask);
        form.reset();
    }
})