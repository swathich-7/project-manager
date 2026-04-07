// ================= LOGIN =================
window.onload = function () {
  const user = localStorage.getItem("currentUser");
  if (user) showApp(user);
};

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("error").innerText = "Enter username & password!";
    return;
  }

  localStorage.setItem("currentUser", username);
  showApp(username);
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

function showApp(username) {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.querySelector("h1").innerText = `😊 Welcome, ${username}`;
  displayProjects();
}

// ================= DATA =================
let projects = JSON.parse(localStorage.getItem("projects")) || [];

function saveData() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// ================= PROJECT =================
function addProject() {
  const name = document.getElementById("projectName").value.trim();
  if (!name) return;

  projects.push({ name, tasks: [] });
  document.getElementById("projectName").value = "";

  saveData();
  displayProjects();
}

function deleteProject(pIndex) {
  projects.splice(pIndex, 1);
  saveData();
  displayProjects();
}

// ================= TASK =================
function showTaskForm(pIndex) {
  document.getElementById(`form-${pIndex}`).innerHTML = `
    <input placeholder="Title" id="title${pIndex}">
    <input placeholder="Description" id="desc${pIndex}">
    
    <select id="priority${pIndex}">
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>

    <input type="date" id="date${pIndex}">

    <select id="status${pIndex}">
      <option>Pending</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>

    <button onclick="addTask(${pIndex})">Add Task</button>
  `;
}

function addTask(pIndex) {
  const title = document.getElementById(`title${pIndex}`).value.trim();
  const desc = document.getElementById(`desc${pIndex}`).value.trim();
  const priority = document.getElementById(`priority${pIndex}`).value;
  const dueDate = document.getElementById(`date${pIndex}`).value;
  const status = document.getElementById(`status${pIndex}`).value;

  if (!title || !desc || !dueDate) {
    alert("Please fill all fields!");
    return;
  }

  const task = { title, description: desc, priority, dueDate, status };

  projects[pIndex].tasks.push(task);

  saveData();

  // CLEAR FORM AFTER ADDING
  document.getElementById(`form-${pIndex}`).innerHTML = "";

  displayProjects();
}

function updateStatus(pIndex, tIndex, value) {
  projects[pIndex].tasks[tIndex].status = value;
  saveData();
  displayProjects();
}

function deleteTask(pIndex, tIndex) {
  projects[pIndex].tasks.splice(tIndex, 1);
  saveData();
  displayProjects();
}

// ================= DISPLAY =================
function displayProjects() {
  const container = document.getElementById("projects");

  const searchInput = document.getElementById("search");
  const filterInput = document.getElementById("filterStatus");

  const search = searchInput ? searchInput.value.toLowerCase() : "";
  const filter = filterInput ? filterInput.value : "";

  container.innerHTML = "";

  projects.forEach((project, pIndex) => {
    let projectDiv = document.createElement("div");
    projectDiv.className = "project";

    projectDiv.innerHTML = `
      <h2>${project.name}</h2>
      <button onclick="showTaskForm(${pIndex})">Add Task</button>
      <button onclick="deleteProject(${pIndex})">Delete Project</button>
      <div id="form-${pIndex}"></div>
    `;

    // SHOW TASKS
    project.tasks.forEach((task, tIndex) => {
      const matchesSearch = task.title.toLowerCase().includes(search);
      const matchesFilter = filter === "" || task.status === filter;

      if (matchesSearch && matchesFilter) {
        let taskDiv = document.createElement("div");

        taskDiv.className = `task ${task.priority.toLowerCase()}`;
        if (task.status === "Completed") {
          taskDiv.classList.add("completed");
        }

        taskDiv.innerHTML = `
          <strong>${task.title}</strong><br>
          ${task.description}<br>
          Priority: ${task.priority} | Due: ${task.dueDate}<br>

          <select onchange="updateStatus(${pIndex}, ${tIndex}, this.value)">
            <option ${task.status==="Pending"?"selected":""}>Pending</option>
            <option ${task.status==="In Progress"?"selected":""}>In Progress</option>
            <option ${task.status==="Completed"?"selected":""}>Completed</option>
          </select>

          <button onclick="deleteTask(${pIndex}, ${tIndex})">Delete</button>
        `;

        projectDiv.appendChild(taskDiv);
      }
    });

    container.appendChild(projectDiv);
  });
}

// // ================= LOGIN SYSTEM =================

// // Run when page loads
// window.onload = function () {
//   const user = localStorage.getItem("currentUser");
//   if (user) {
//     showApp(user);
//   }
// };

// // Login (accept ANY username & password)
// function login() {
//   console.log("Login clicked");

//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (!username || !password) {
//     document.getElementById("error").innerText = "Enter username & password!";
//     return;
//   }

//   localStorage.setItem("currentUser", username);
//   showApp(username);
// }

// // Logout
// function logout() {
//   localStorage.removeItem("currentUser");
//   location.reload();
// }

// // Show Dashboard
// function showApp(username) {
//   document.getElementById("loginPage").style.display = "none";
//   document.getElementById("app").style.display = "block";

//   document.querySelector("h1").innerText = `📊 Welcome, ${username}`;
//   displayProjects();
// }

// // ================= PROJECT DATA =================

// let projects = JSON.parse(localStorage.getItem("projects")) || [];

// // Save data
// function saveData() {
//   localStorage.setItem("projects", JSON.stringify(projects));
// }

// // ================= PROJECT FUNCTIONS =================

// // Add Project
// function addProject() {
//   const name = document.getElementById("projectName").value.trim();
//   if (!name) return;

//   projects.push({ name, tasks: [] });
//   document.getElementById("projectName").value = "";

//   saveData();
//   displayProjects();
// }

// // Delete Project
// function deleteProject(pIndex) {
//   projects.splice(pIndex, 1);
//   saveData();
//   displayProjects();
// }

// // ================= TASK FUNCTIONS =================

// // Show Task Form
// function showTaskForm(pIndex) {
//   document.getElementById(`form-${pIndex}`).innerHTML = `
//     <input placeholder="Title" id="title${pIndex}">
//     <input placeholder="Description" id="desc${pIndex}">
    
//     <select id="priority${pIndex}">
//       <option>Low</option>
//       <option>Medium</option>
//       <option>High</option>
//     </select>

//     <input type="date" id="date${pIndex}">

//     <select id="status${pIndex}">
//       <option>Pending</option>
//       <option>In Progress</option>
//       <option>Completed</option>
//     </select>

//     <button onclick="addTask(${pIndex})">Add Task</button>
//   `;
// }

// // Add Task
// function addTask(pIndex) {
//   const title = document.getElementById(`title${pIndex}`).value.trim();
//   const desc = document.getElementById(`desc${pIndex}`).value.trim();

//   if (!title || !desc) {
//     alert("Please fill all fields!");
//     return;
//   }

//   const task = {
//     title: title,
//     description: desc,
//     priority: document.getElementById(`priority${pIndex}`).value,
//     dueDate: document.getElementById(`date${pIndex}`).value,
//     status: document.getElementById(`status${pIndex}`).value
//   };

//   projects[pIndex].tasks.push(task);

//   saveData();
//   displayProjects();
// }

// // Update Task Status
// function updateStatus(pIndex, tIndex, value) {
//   projects[pIndex].tasks[tIndex].status = value;
//   saveData();
//   displayProjects();
// }

// // Delete Task
// function deleteTask(pIndex, tIndex) {
//   projects[pIndex].tasks.splice(tIndex, 1);
//   saveData();
//   displayProjects();
// }

// // ================= DISPLAY =================

// function displayProjects() {
//   const container = document.getElementById("projects");
//   const search = document.getElementById("search")?.value.toLowerCase() || "";
//   const filter = document.getElementById("filterStatus")?.value || "";

//   container.innerHTML = "";

//   projects.forEach((project, pIndex) => {
//     let div = document.createElement("div");
//     div.className = "project";

//     div.innerHTML = `
//       <h2>${project.name}</h2>
//       <button onclick="showTaskForm(${pIndex})">Add Task</button>
//       <button onclick="deleteProject(${pIndex})">Delete Project</button>
//       <div id="form-${pIndex}"></div>
//     `;

//     project.tasks.forEach((task, tIndex) => {
//       if (
//         task.title.toLowerCase().includes(search) &&
//         (filter === "" || task.status === filter)
//       ) {
//         let taskDiv = document.createElement("div");

//         taskDiv.className = `task ${task.priority.toLowerCase()}`;
//         if (task.status === "Completed") {
//           taskDiv.classList.add("completed");
//         }

//         taskDiv.innerHTML = `
//           <strong>${task.title}</strong><br>
//           ${task.description}<br>
//           Priority: ${task.priority} | Due: ${task.dueDate}<br>

//           <select onchange="updateStatus(${pIndex}, ${tIndex}, this.value)">
//             <option ${task.status==="Pending"?"selected":""}>Pending</option>
//             <option ${task.status==="In Progress"?"selected":""}>In Progress</option>
//             <option ${task.status==="Completed"?"selected":""}>Completed</option>
//           </select>

//           <button onclick="deleteTask(${pIndex}, ${tIndex})">Delete</button>
//         `;

//         div.appendChild(taskDiv);
//       }
//     });

//     container.appendChild(div);
//   });
// }