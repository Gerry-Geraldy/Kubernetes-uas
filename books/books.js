const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); 

app.use(bodyParser.json());
app.use(cors());

require("./book");
const Book = mongoose.model("Book");

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://gerry_geraldi:gerry28september@cluster0.y796vp7.mongodb.net/booksservice?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database book is connected!");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

// Define a basic route
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to handle POST request to create a book
app.post("/book", async (req, res) => {
  const { title, author, numberPages, publisher } = req.body;
  try {
    const newBook = new Book({ title, author, numberPages, publisher });
    await newBook.save();
    res.status(201).send("A new  created with success");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/book/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send("Book removed with success");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4545;
app.listen(PORT, () => {
  console.log("Up and running -- This is our Books service");
});
