const express = require("express");
require("dotenv").config();
require("colors");
const path = require('path');
const fs = require('fs')
const { errorHandler } = require("./middleware/errors");

const app = express();
const connectDB = require("./config/db");

// Connect to MongoDB using mongoose
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get all endpoint routes in /api
fs.readdirSync(path.join(__dirname, 'api')).forEach(file => {
  let endpoint = file.substring(0, file.lastIndexOf("."))
  app.use(`/api/${endpoint}`, require(`./api/${endpoint}`))
})

// Static paths
app.use("/images", express.static("public/images"));
app.use("/pages", express.static("public/pages"));


app.use(errorHandler);

// Starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}: http://localhost:${process.env.PORT}`.cyan);
});
