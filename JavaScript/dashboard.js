const userName = localStorage.getItem("userName") || "User";
const userEmail = localStorage.getItem("userEmail") || "";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("welcome-text").textContent = `Welcome, ${userName}! 🎉`;
  document.getElementById("user-email-info").textContent = `Your email: ${userEmail}`;

  populateGroups();
  loadTasks();
  loadGroupTasks();
  checkReminders();

  const groupSelect = document.getElementById("group-select");
  if (groupSelect) {
    groupSelect.addEventListener("change", () => {
      loadGroupTasks();
      document.getElementById("notes-list").innerHTML = "";
      currentNoteTaskIndex = null;
    });
  }
});

function logout() {
  alert("Logging out...");
  console.log("Logged Out!");
  window.location.href = "../HTML/login.html";
}

// === PERSONAL TASKS ===
function addTask() {
  const input = document.getElementById("task-input");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: input.value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  loadTasks();
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.text} <button onclick="deleteTask(${index})">❌</button>`;
    list.appendChild(li);
  });
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// === GROUP TASKS ===
function populateGroups() {
  const groupSelect = document.getElementById("group-select");
  const groups = JSON.parse(localStorage.getItem("groups")) || [
    { name: "Team Alpha", role: "admin" },
    { name: "Team Beta", role: "member" }
  ];
  groupSelect.innerHTML = "";
  groups.forEach((group) => {
    const option = document.createElement("option");
    option.value = group.name;
    option.textContent = `${group.name} (${group.role})`;
    groupSelect.appendChild(option);
  });
}

function addGroupTask() {
  const group = document.getElementById("group-select").value;
  const input = document.getElementById("group-task-input");
  const key = "groupTasks_" + group;
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  tasks.push({ text: input.value, notes: [] });
  localStorage.setItem(key, JSON.stringify(tasks));
  input.value = "";
  loadGroupTasks();
}

function loadGroupTasks() {
  const group = document.getElementById("group-select").value;
  const key = "groupTasks_" + group;
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  const list = document.getElementById("group-task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.text} <button onclick="selectTask(${index})">📝 Notes</button>`;
    list.appendChild(li);
  });
}

// === NOTES ===
let currentNoteTaskIndex = null;
function selectTask(index) {
  currentNoteTaskIndex = index;
  loadNotes();
}

function addNote() {
  const group = document.getElementById("group-select").value;
  const key = "groupTasks_" + group;
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  const noteInput = document.getElementById("task-note-input");
  if (currentNoteTaskIndex !== null && noteInput.value) {
    tasks[currentNoteTaskIndex].notes.push(noteInput.value);
    localStorage.setItem(key, JSON.stringify(tasks));
    noteInput.value = "";
    loadNotes();
  }
}

function loadNotes() {
  const group = document.getElementById("group-select").value;
  const key = "groupTasks_" + group;
  const tasks = JSON.parse(localStorage.getItem(key)) || [];
  const notes = (tasks[currentNoteTaskIndex] && tasks[currentNoteTaskIndex].notes) || [];
  const list = document.getElementById("notes-list");
  list.innerHTML = "";
  notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    list.appendChild(li);
  });
}

// === REMINDERS ===
function checkReminders() {
  const now = new Date();
  const hour = now.getHours();
  const output = document.getElementById("reminder-output");
  if (hour === 9 || hour === 17) {
    output.textContent = "You have tasks to review today!";
  } else {
    output.textContent = "No upcoming reminders.";
  }
}
