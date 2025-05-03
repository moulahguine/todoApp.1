import { removeTaskById, getTasks } from "./taskManager.js";
import { saveTasks } from "./storage.js";

export function renderTasks(tasks, container) {
  if (tasks.length !== 0) {
    container.innerHTML = "";
    document.getElementsByClassName("zeroTask")[0].style.display = "none";
  } else {
    document.getElementsByClassName("zeroTask")[0].style.display = "block";
  }
  tasks.forEach((task, i) => renderTask(task, i, container));
}

export function renderTask(task, i, container) {
  const mainContainer_task = document.createElement("div");
  mainContainer_task.className = `task num_${i + 1}`;
  mainContainer_task.id = task.id;

  const container_task = document.createElement("main");
  container_task.className = "container";

  const content_task = document.createElement("div");
  content_task.className = "content";

  const title_task = document.createElement("h1");
  title_task.textContent = task.title;

  const about_task = document.createElement("p");
  about_task.textContent = task.about;

  const remove_task = document.createElement("button");
  remove_task.className = "removeTaskBtn";
  remove_task.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  const btn_bottom = document.createElement("div");
  btn_bottom.className = "options";

  const edit_task = document.createElement("button");
  edit_task.className = "editTask";
  edit_task.innerHTML = `<i class="fa-solid fa-pen"></i>`;

  const share_task = document.createElement("button");
  share_task.className = "shareTask";
  share_task.innerHTML = `<i class="fa-solid fa-share-nodes"></i>`;

  const del_alert = document.createElement("div");
  del_alert.className = "co_alert";
  const alert = document.createElement("div");
  alert.className = "alert";
  const p_alert = document.createElement("p");
  p_alert.className = "p_alert";
  p_alert.textContent = "Delete this task?";
  const btn_alert = document.createElement("div");
  const yes_del = document.createElement("button");
  yes_del.textContent = "yes";
  const no_del = document.createElement("button");
  no_del.textContent = "no";

  content_task.appendChild(title_task);
  content_task.appendChild(about_task);
  container_task.appendChild(content_task);
  container_task.appendChild(remove_task);
  mainContainer_task.appendChild(container_task);
  mainContainer_task.appendChild(btn_bottom);

  btn_bottom.appendChild(edit_task);
  btn_bottom.appendChild(share_task);
  del_alert.appendChild(alert);
  alert.appendChild(p_alert);
  alert.appendChild(btn_alert);
  btn_alert.appendChild(yes_del);
  btn_alert.appendChild(no_del);

  // Event: toggle options
  content_task.addEventListener("click", () => {
    document
      .querySelectorAll(".options")
      .forEach((opt) => opt.classList.remove("active"));
    btn_bottom.classList.add("active");
  });

  // Event: show delete dialog
  remove_task.addEventListener("click", () => {
    document.querySelector(".container_todoApp").appendChild(del_alert);
  });

  // Event: delete confirmation
  yes_del.addEventListener("click", () => {
    mainContainer_task.remove();
    del_alert.remove();
    removeTaskById(task.id);
    saveTasks(getTasks());
  });

  no_del.addEventListener("click", () => {
    del_alert.remove();
  });

  container.appendChild(mainContainer_task);
}
