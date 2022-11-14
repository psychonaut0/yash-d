const express = require("express");
require("dotenv").config();
require("colors");
const { errorHandler } = require("./middleware/errors");

const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello Everybody!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`.cyan);
});
