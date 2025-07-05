const form = document.getElementById("form");
const taskName = document.getElementById("task-name");
const category = document.getElementById("category");
const deadline = document.getElementById("deadline");
const updateButton = document.getElementById("update-button");
const statusFilter = document.getElementById("status-filter");
const categoryFilter = document.getElementById("category-filter");
const taskContainer = document.getElementById("task-container");
const filterContainer = document.getElementById("filter-container");

//populates full task list from local storage or creates a new empty list on page load
let fullTaskList = JSON.parse(localStorage.getItem("fullTaskList")) || [];

//loading from json keeps date as a string.  This fixes it
if (fullTaskList.length > 0) {
  fullTaskList.forEach((task) => {
    task.deadline = new Date(task.deadline);
  });
}
let idCounter = localStorage.getItem("id") || 0;

let categoryList = [];

//builds a category list for filter box, and then creates dropdown menu for categories
function categoryListBuilder() {
  categoryList = [];
  categoryList.push("All");

  fullTaskList.forEach((task) => {
    if (!categoryList.includes(task.category)) {
      categoryList.push(task.category);
    }
  });

  //builds the list into the filter box for user interaction
  categoryFilter.innerHTML = "";
  let fragment = document.createDocumentFragment();
  categoryList.forEach((category) => {
    let option = document.createElement("option");
    if (category == "All") option.selected = true;
    option.textContent = category;
    fragment.appendChild(option);
  });

  categoryFilter.appendChild(fragment);
}

//renders list and category search for user side on page load
categoryListBuilder();
renderList();

//basic function for saving data to local storage
function saveData() {
  localStorage.setItem("fullTaskList", JSON.stringify(fullTaskList));
  localStorage.setItem("id", idCounter);
}

//creates a task object
class Task {
  constructor(taskName, category, deadline, id, status = "In Progress") {
    this.name = taskName;
    this.category = category;
    this.status = status;
    this.id = id;
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

//function to create a new data cell
function createDataCell(valueToInput) {
  let td = document.createElement("td");
  if (typeof valueToInput == "object") td.appendChild(valueToInput);
  else td.textContent = valueToInput;
  return td;
}

//checks deadline on an item and returns whether it is overdue or in progress
function deadlineChecker(task) {
  return task.deadline >= new Date() ? "In Progress" : "Overdue";
}

//version 2 of function, for less repitition.  Returns status dropdown box with current status of task as default
function statusDropdown(taskStatus) {
  let statusOptions = [
    { name: "In Progress", className: "text-green-700" },
    { name: "Completed", className: "text-blue-800" },
    { name: "Overdue", className: "text-red-800" },
  ];

  const select = document.createElement("select");

  statusOptions.forEach((listStatus) => {
    let option = document.createElement("option");
    option.textContent = listStatus.name;
    option.className = listStatus.className;
    if (listStatus.name == taskStatus) {
      option.selected = true;
      select.className = option.className;
    }
    select.appendChild(option);
  });
  return select;
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
    row.className = "task text-center border border-gray-400";
    row.dataset.id = task.id;
    row.appendChild(createDataCell(task.name));
    row.appendChild(createDataCell(task.category));
    row.appendChild(createDataCell(task.deadline.toLocaleString()));
    row.appendChild(createDataCell(statusDropdown(task.status)));

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
    let newTask = new Task(
      taskName.value,
      category.value,
      deadline.value,
      idCounter
    );
    fullTaskList.push(newTask);
    idCounter++;
    saveData();
    renderList();
    categoryListBuilder();
    form.reset();
  }
});

//if update is clicked, renders list
updateButton.addEventListener("click", (event) => {
  renderList();
});

//listens for dropdown menu update
taskContainer.addEventListener("change", (event) => {
  let dropdown = event.target;
  let trTask = event.target.closest("tr");
  let listTask = fullTaskList.find((task) => task.id == trTask.dataset.id);
  listTask.status = dropdown.value;
  saveData();
  renderList();
});

//listens for filter changes and changes what viewer sees right away
filterContainer.addEventListener("change", (event) => {
  renderList();
});
