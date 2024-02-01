//importing dot env config to use our env varaible while making a connection to our atlas mongo atlas cloud database
require("dotenv").config();

/*
  Import Mongoose for MongoDB interaction:
  Mongoose is an Object-Document Mapping (ODM) library that simplifies communication with MongoDB.
  It provides a schema-based solution, middleware support, and query building capabilities.
  Mongoose helps define data models, ensures data consistency, and facilitates connection
  management with the MongoDB database.
*/
const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Check if the connection is successful
    if (conn) {
      console.log("MongoDB connected successfully", conn.connection.host);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = connectDB;
