const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://gerry_geraldi:gerry28september@cluster0.y796vp7.mongodb.net/customerservice?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Customer Service is connected!");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

require("./customer");
const Customer = mongoose.model("Customer");

// Route to handle POST request to create a book
app.post("/customer", async (req, res) => {
  const { name, age, address } = req.body;
  try {
    const newCustomer = new Customer({ name, age, address });
    await newCustomer.save();
    res.status(201).send("A new customer created with success");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DGet all customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/customer/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/customer/:id", async (req, res) => {
      try {
        await Customer.findByIdAndDelete(req.params.id);
        res.send("Customer removed with success");
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

app.listen("5555", () => {
  console.log("Up and running, Customer service");
});
