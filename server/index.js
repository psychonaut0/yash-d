const express = require("express");
require("dotenv").config();
require("colors");
const { errorHandler } = require("./middleware/errors");

const app = express();
const connectDB = require("./config/db");

const fs = require('fs');
const path = require('path')

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tiles", require("./api/tiles"));

app.use('/media', express.static('public'))

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`.cyan);
});
