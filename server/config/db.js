const mongoose = require("mongoose");
const { createClient } = require("redis");

/**
 * Create connection to mongoDB database with mongoose.
 * db uri is stored in .env as MONGO_URI
 * 
 * @function connectDB async
 */
const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


module.exports = {
  connectMongo,
};
