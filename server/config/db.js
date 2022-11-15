const mongoose = require("mongoose");

/**
 * Create connection to mongoDB database with mongoose.
 * db uri is stored in .env as MONGO_URI
 * 
 * @function connectDB async
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
