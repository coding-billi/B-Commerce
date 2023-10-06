const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  items: [
    {
      // Each item in the cart is represented as an object
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", // Reference the "products" collection
        required: true,
      },
      quantity: {
        // The quantity of the product in the cart
        type: Number,
        required: true, // The quantity is required for each cart item
        min: 1, // Minimum quantity is 1
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cart", CartSchema);
