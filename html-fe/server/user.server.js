const userForm = document.querySelector("#userForm");
const userNameInput = document.querySelector("#userName");
const userTableBody = document.querySelector("#userTable tbody");

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

fetchUsers();

userForm.addEventListener("submit", saveUser);
