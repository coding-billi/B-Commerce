const path = require("path");

// Load environment variables from the .env file in the current directory
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Import the function to connect to MongoDB
const connectToMongo = require("./db");

// Import necessary packages
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Create an instance of Express
const app = express();

// Define the port to listen on
const port = process.env.PORT;

// Connect to MongoDB
connectToMongo();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:5173",
};

// Set up middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(fileUpload()); // Enable file uploads
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Define routes
app.use("/api/auth", require("./routes/auth")); // authorization route for creating and logging users also making addresses
app.use("/api/products", require("./routes/products")); // for making products and updating them or deleting them
app.use("/api/cart", require("./routes/cart")); // making a cart adding items into and removing from it
app.use("/api/store", require("./routes/store")); // making stores to make products, manage orders, etc.
app.use("/api/review", require("./routes/review")); // making reviews, updating them which are store and product specific
app.use("/api/order", require("./routes/placeOrder")); // placing orders with a store also utilizing the addresses we made in the auth route
app.use("/api/upload", require("./routes/upload")); // for uploading images to imgur, these images are used for stores and products

// Define a basic route
app.get("/", (req, res) => {
  res.send("meow homeage"); // random message please dont change it also dont change the spellings of homepage
});

// Start the Express server
app.listen(port, () => {
  console.log(`http://localhost:${port} express working`); // Log a message indicating that the server is running
});
