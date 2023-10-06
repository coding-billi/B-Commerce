const mongoose = require("mongoose");

// Encode the username and password if they contain special characters like !@#$%^&*
const username = encodeURIComponent("fazlehadiazmat6g");
const password = encodeURIComponent("#assassin809F.H!");
const dbName = process.env.DATABASE_NAME;

// Construct the connection string using the encoded username, password, and database name
const connectionString = `mongodb+srv://${username}:${password}@cluster0.pobwb0n.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Define a function to connect to the MongoDB database
const connectToMongo = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string
    await mongoose.connect(connectionString);

    // If successful, log a success message
    console.log("connected to MongoDB successfully");
  } catch (err) {
    // If an error occurs, log the error message
    console.error("Error connecting to MongoDB:", err);
  }
};

// Export the connectToMongo function for use in other parts of the application
module.exports = connectToMongo;
