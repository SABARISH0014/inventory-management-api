const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/products", productRoutes);
app.use("/api/reports", reportRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;