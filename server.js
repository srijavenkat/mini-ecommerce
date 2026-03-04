const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let cart = [];

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// GET PRODUCT
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD TO CART
app.post("/cart", (req, res) => {
  cart.push(req.body);
  res.json({ message: "Added to cart" });
});

// GET CART
app.get("/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  res.json({ cart, total });
});

// BUY
app.post("/buy", (req, res) => {
  cart = [];
  res.json({ message: "Purchase successful" });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});