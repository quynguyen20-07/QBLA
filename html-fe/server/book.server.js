const bookForm = document.querySelector("#bookForm");
const bookTitleInput = document.querySelector("#bookTitle");
const bookTableBody = document.querySelector("#bookTable tbody");

function fetchBooks() {
  fetch("http://localhost:3000/books")
    .then((response) => response.json())
    .then((data) => {
      bookTableBody.innerHTML = "";
      data.forEach((book) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${book.id}</td>
          <td>${book.title}</td>
          <td>
            <button onclick="editBook(${book.id}, '${book.title}')">Edit</button>
            <button onclick="deleteBook(${book.id})">Delete</button>
          </td>
        `;
        bookTableBody.appendChild(row);
      });
    });
}

function saveBook(event) {
  event.preventDefault();

  const bookId = document.querySelector("#bookId").value;
  const bookTitle = bookTitleInput.value;

  if (bookId) {
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: bookTitle }),
    }).then(() => {
      bookForm.reset();
      fetchBooks();
    });
  } else {
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: bookTitle }),
    }).then(() => {
      bookForm.reset();
      fetchBooks();
    });
  }
}

function editBook(id, title) {
  document.querySelector("#bookId").value = id;
  bookTitleInput.value = title;
}

function deleteBook(id) {
  fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  }).then(() => fetchBooks());
}

fetchBooks();

bookForm.addEventListener("submit", saveBook);
