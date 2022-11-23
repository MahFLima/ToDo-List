import "https://unpkg.com/phosphor-icons";
const task = document.querySelector("#task");
let tasks = [];
let count = 0

function addHidden() {
  document.querySelector(".clip").classList.add("hidden");
  document.querySelector(".description").classList.add("hidden");
}

function removeHidden() {
  document.querySelector(".clip").classList.remove("hidden");
  document.querySelector(".description").classList.remove("hidden");
}

function reload() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
  document.querySelector(".content").innerHTML = "<p></p>";
  document.querySelector(".total-tasks").innerText = tasks.length;
  document.querySelector(".total-checked").innerText = `${count} de ${tasks.length}`;

  listTasks();
}

function removeTask(value) {
  const result = tasks.filter((item, index) => index != value);
  tasks = result;

  if (tasks.length <= 0) {
    removeHidden();
  }

  reload();
}

function listTasks() {
  tasks.map((item, index) => {
    const div = document.createElement("div");
    div.classList.add("content-task");

    const button = document.createElement("button");
    const checkbox = document.createElement("div");

    checkbox.classList.add("custom-checkbox");
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.setAttribute("id", `checkbox-${index}`);
    const label = document.createElement("label");
    label.innerHTML = item
    label.setAttribute("for", `checkbox-${index}`);
    checkbox.appendChild(check);
    checkbox.appendChild(label);

    const i = document.createElement("i");
    i.classList.add("ph-trash");
    button.appendChild(i);

    button.classList.add("remove");
    button.onclick = () => removeTask(index);

    div.appendChild(checkbox);
    div.appendChild(button);
    document.querySelector(".content").appendChild(div);
  });
}

if (localStorage.length) {
  tasks = JSON.parse(localStorage.getItem("myTasks"));
  document.querySelector(".total-tasks").innerText = tasks.length;
  document.querySelector(".total-checked").innerText = `0 de ${tasks.length}`;
  document.querySelector(".clip").classList.add("hidden");
  document.querySelector(".description").classList.add("hidden");
  listTasks();
} else {
  tasks = [];
  document.querySelector(".clip").classList.remove("hidden");
  document.querySelector(".description").classList.remove("hidden");
}

function addTask() {
  tasks.push(task.value);
  reload();
  addHidden();
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

const input = document.querySelectorAll("input[type=checkbox]");

input.forEach((card) => {
  card.addEventListener("change", (event) => {
    if (event.target.checked) {
      count++
      document.querySelector(".total-checked").innerText = `${count} de ${tasks.length}`
    } else {
      count--
      document.querySelector(".total-checked").innerText = `${count} de ${tasks.length}`
    }
  });
});


