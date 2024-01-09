document.addEventListener("DOMContentLoaded", function () {
  const addBookForm = document.getElementById("addBookForm");
  const booksList = document.getElementById("books-list");

  const fetchAndDisplayBooks = () => {
    fetch("http://books-service:4545/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const booksHTML = data
          .map((book) => {
            return `<div class="book">
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author}</p>
                        <p>Pages: ${book.numberPages}</p>
                        <p>Publisher: ${book.publisher}</p>
                        <button class="edit-button" data-book-id="${book.id}">Edit</button>
                        <button class="delete-button" data-book-id="${book.id}">Delete</button>          
                  </div>`;
          })
          .join("");

        booksList.innerHTML = booksHTML;
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        alert("Failed to fetch books. Check console for details.");
      });
  };

  fetchAndDisplayBooks();

  addBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const numberPages = document.getElementById("numberPages").value;
    const publisher = document.getElementById("publisher").value;

    try {
      const response = await fetch("http://localhost:4545/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          numberPages,
          publisher,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add book! Status: ${response.status}`);
      }

      alert("Book added successfully!");
      fetchAndDisplayBooks();
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Check console for details.");
    }
  });
});
