const inputTask = document.getElementById("task");
const btnSave = document.getElementById("btnSave");
const taskList = document.getElementById("taskList");

window.addEventListener("DOMContentLoaded", showTasks);

btnSave.addEventListener("click", () => {
    const text = inputTask.value.trim();
    if (text === "") return;
    addTask(text, false);
    saveTasks();
    inputTask.value = "";
});

function addTask(text, completed) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    checkbox.type = "checkbox";
    label.textContent = text;
    if (completed) {
        checkbox.checked = true;
        label.classList.add("completed");
    }
    checkbox.addEventListener("change", () => {
        label.classList.toggle("completed");
        saveTasks();
    });
    li.appendChild(checkbox);
    li.appendChild(label);
    taskList.appendChild(li);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector("label").textContent;
        const check = li.querySelector("input").checked ? "*" : "";
        tasks.push(text + check);
    });
    localStorage.setItem("tasks", tasks.join("|"));
}

function showTasks() {
    const data = localStorage.getItem("tasks");
    if (!data) return;
    const tasks = data.split("|");
    tasks.forEach(t => {
        if (t.trim() !== "") {
            const text = t.replace("*", "");
            const completed = t.includes("*");
            addTask(text, completed);
        }
    });
}