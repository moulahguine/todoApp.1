let tasks = [];

export function addTask(task) {
  tasks.push(task);
}

export function removeTaskById(id) {
  tasks = tasks.filter((t) => t.id !== id);
}

export function getTasks() {
  return [...tasks];
}

export function setTasks(newTasks) {
  tasks = [...newTasks];
}
