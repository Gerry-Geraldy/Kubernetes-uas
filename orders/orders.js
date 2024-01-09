const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://gerry_geraldi:gerry28september@cluster0.y796vp7.mongodb.net/orderservice?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database Order Service is connected!");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

require("./order");
const Order = mongoose.model("Order");

app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: new mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: new mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  };
  var order = new Order(newOrder);

  order
    .save()
    .then(() => {
      console.log("Order created with success!");
      res.status(201).json({ message: "Order created successfully" });
    })
    .catch((err) => {
      console.error("Error creating order:", err);
      res.status(500).json({ error: "Failed to create order" });
    });
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id).then((order) => {
    if (order) {
      axios
        .get("http://localhost:5555/customer/" + order.CustomerID)
        .then((response) => {
          var orderObject = {
            customerName: response.data.name,
            bookTitle: "",
            bookAuthor: "",
          };

          axios
            .get("http://localhost:4545/book/" + order.BookID) // Fixed path
            .then((response) => {
              orderObject.bookTitle = response.data.title;
              orderObject.bookAuthor = response.data.author;
              res.json(orderObject);
            })
            .catch((error) => {
              console.error("Error fetching book:", error);
              res.status(500).json({ error: "Failed to fetch book" });
            });
        })
        .catch((error) => {
          console.error("Error fetching customer:", error);
          res.status(500).json({ error: "Failed to fetch customer" });
        });
    } else {
      res.send("Invalid Order");
    }
  });
});

app.listen(7777, () => {
  console.log("Up and running - Orders service");
});
