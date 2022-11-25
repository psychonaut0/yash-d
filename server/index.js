const express = require("express");
const fs = require('fs')
const path = require('path');
const cors = require('cors')

require("dotenv").config();
require("colors");

const { errorHandler } = require("./middleware/errors");

const app = express();

// Connect to MongoDB using mongoose
const connectDB = require("./config/db");
connectDB();

// General middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: process.env.CLIENT_URI}))


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
