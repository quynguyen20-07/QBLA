const userForm = document.querySelector("#userForm");
const userNameInput = document.querySelector("#userName");
const userTableBody = document.querySelector("#userTable tbody");
const userOne = document.querySelector("#userOne");

function fetchUsers() {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      userTableBody.innerHTML = "";
      data.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>
            <button onclick="editUser(${user.id}, '${user.name}')">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
            <a href="UserDetail.html?id=${user.id}">View</a>
            </td>
          </td>
        `;
        userTableBody.appendChild(row);
      });
    });
}

function saveUser(event) {
  event.preventDefault();

  const userId = document.querySelector("#userId").value;
  const userName = userNameInput.value;
  if (userId) {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    }).then(() => {
      userForm.reset();
      fetchUsers();
    });
  } else {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    }).then(() => {
      userForm.reset();
      fetchUsers();
    });
  }
}

function editUser(id, name) {
  document.querySelector("#userId").value = id;
  userNameInput.value = name;
}

function deleteUser(id) {
  fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  }).then(() => fetchUsers());
}

function fetchUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  if (userId) {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((user) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p>ID: ${user.id}</p>
          <p>Name: ${user.name}</p>
        `;
        userOne.appendChild(div);
      });
  }
}

fetchUser();
fetchUsers();

userForm.addEventListener("submit", saveUser);
