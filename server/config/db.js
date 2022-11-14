const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  const db = await mongoose.connection;
  await db.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );
};

module.exports = connectDB;
