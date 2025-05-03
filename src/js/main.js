import { addTask, getTasks, setTasks } from "./taskManager.js";
import { saveTasks, loadTasks } from "./storage.js";
import { renderTasks, renderTask } from "./domRenderer.js";

const inputs = {
  title: document.querySelector(".todoApp form .inputs .input_title"),
  about: document.querySelector(".todoApp form .inputs .input_about"),
};
const btnAddTask = document.querySelector(".todoApp form .btnAddTask");
const boxHasList = document.querySelector(".todoApp .listTasks");

// Load and render tasks on page load
const loadedTasks = loadTasks();
setTasks(loadedTasks);
renderTasks(loadedTasks, boxHasList);

btnAddTask.addEventListener("click", (e) => {
  e.preventDefault();
  const title = inputs.title.value.trim();
  const about = inputs.about.value.trim();
  if (!title || !about) return;

  const newTask = {
    id: Date.now(),
    title,
    about,
    completed: false,
  };

  addTask(newTask);
  saveTasks(getTasks());
  renderTask(newTask, getTasks().length - 1, boxHasList);

  inputs.title.value = "";
  inputs.about.value = "";
});
