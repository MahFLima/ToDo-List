import "https://unpkg.com/phosphor-icons";
const task = document.querySelector("#task");
let tasks = [];
var checkbox = document.querySelectorAll("input[type=checkbox]");

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
  document.querySelector(".container").innerHTML = "<p></p>";
  document.querySelector(".total-tasks").innerText = tasks.length;
  document.querySelector(".total-checked").innerText = `0 de ${tasks.length}`;
  listTasks();
}

function removeTask(value) {
  const result = tasks.filter((item, index) => index != value);
  tasks = result;

  reload();
}

function listTasks() {
  tasks.map((item, index) => {
    const div = document.createElement("div");
    div.classList.add("content-task");

    const p = document.createElement("p");
    const radio = document.createElement("input");
    const button = document.createElement("button");

    const i = document.createElement("i");
    i.classList.add("ph-trash");
    button.appendChild(i);
    button.classList.add("remove");
    button.onclick = () => removeTask(index);

    radio.setAttribute("type", "checkbox");

    radio.classList.add("checkmark");
    p.innerText = item;

    div.appendChild(radio);
    div.appendChild(p);
    div.appendChild(button);
    document.querySelector(".container").appendChild(div);
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
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

checkbox.forEach((card) => {
  card.addEventListener("change", function () {
    if (this.checked) {
      console.log("ok");
    } else {
      console.log("not ok");
    }
  });
});
