const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = [];

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = taskInput.value.trim();

    if (description === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        description: description,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    const sortedTasks = [...tasks].sort((a, b) => {
        return a.completed - b.completed;
    });

    sortedTasks.forEach(function (task) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.description;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");

        completeButton.textContent = task.completed
            ? "Uncomplete"
            : "Complete";

        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}