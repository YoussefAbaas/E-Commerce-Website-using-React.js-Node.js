require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./db/config");

const User = require("./db/User");
const Product = require("./db/Product");

const jwt = require("jsonwebtoken");
const jwt_key = "e-comm";

const app = express();
app.listen(4000);

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    console.log("body is", req.body);
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ user }, jwt_key, { expiresIn: "2h" });
    res.status(200).send({ name: user.name, _id: user._id, email, token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("body is", req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) res.status(400).send({ error: "not correct email or password" });
    else {
      const token = jwt.sign({ user }, jwt_key, { expiresIn: "2h" });
      res.status(200).send({ name: user.name, _id: user._id, email, token });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.use(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "authorization token required" });
  const token = authorization.split(" ")[1];
  try {
    const { user } = jwt.verify(token, jwt_key);
    req.user = await User.findOne({ _id: user._id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request is not authorized" });
  }
});

app.post("/add-product", async (req, res) => {
  console.log("body is", req.body);
  try {
    const product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).send("deleted sucessfully");
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get("/search/:key", async (req, res) => {
  const key = req.params.key;
  try {
    const result = await Product.find({
      $and: [
        { userId: req.user._id },
        { $or: [{ name: { $regex: key } }, { company: { $regex: key } }] },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
