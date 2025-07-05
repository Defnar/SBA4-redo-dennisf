const form = document.getElementById("form");
const taskName = document.getElementById("task-name");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const updateButton = document.getElementById("update-button");
const statusFilter = document.getElementById("status-filter");
const categoryFilter = document.getElementById("category-filter");
const taskContainer = document.getElementById("task-container");

//populates full task list from local storage or creates a new empty list on page load
let fullTaskList = JSON.parse(localStorage.getItem("fullTaskList")) || [];

renderList();

//basic function for saving data to local storage
function saveData() {
  localStorage.setItem("fullTaskList", JSON.stringify(fullTaskList));
}

//creates a task object
class Task {
  constructor(taskName, category, deadline, status = "In Progress") {
    this.name = taskName;
    this.category = category;
    this.status = status;
    this.deadline = new Date(deadline);
    console.log(this.deadline);
  }
}

//filter through the list and returns a filtered list
function filterList() {
  let selectedCategory = categoryFilter.value;
  let selectedStatus = statusFilter.value;

  let intermediaryArray = fullTaskList.filter(
    (task) => task.status == selectedStatus || selectedStatus == "All"
  );
  return intermediaryArray.filter(
    (task) => task.category == selectedCategory || selectedCategory == "All"
  );
}

//helper function to create a new data cell
function createDataCell(valueToInput) {
  let td = document.createElement("td");
  td.textContent = valueToInput;
  return td;
}

//checks deadline on an item and returns whether it is overdue or in progress
function deadlineChecker(task) {
  return task.deadline >= new Date() ? "In Progress" : "Overdue";
}

//page update function
function renderList() {
  taskContainer.innerHTML = "";

  let displayedTasklist = filterList();

  let fragment = document.createDocumentFragment();

  //runs through a filtered list to create elements to display
  //table order is task name| task category| deadline | status
  displayedTasklist.forEach((task) => {
    if (task.status == "In Progress") task.status = deadlineChecker(task);

    let row = document.createElement("tr");
    row.className = "text-center border border-gray-400";
    row.appendChild(createDataCell(task.name));
    row.appendChild(createDataCell(task.category));
    row.appendChild(createDataCell(task.deadline.toLocaleString()));
    row.appendChild(createDataCell(task.status));

    fragment.appendChild(row);
  });
  taskContainer.appendChild(fragment);
}

//Event Listeners//
//event listener to add new task to master task list
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    taskName.validity.valid &&
    category.validity.valid &&
    deadline.validity.valid
  ) {
    let newTask = new Task(taskName.value, category.value, deadline.value);
    fullTaskList.push(newTask);
    saveData();
    console.log(fullTaskList);
    renderList();
    form.reset();
  }
});


//if update is clicked, renders list
updateButton.addEventListener("click", (event) => {
  renderList();
})
