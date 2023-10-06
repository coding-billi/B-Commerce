const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  images: [String], // Array of image URLs

  stockQuantity: {
    type: Number,
    required: true,
  },

  // by rating i mean 4.5, 4.9, 3.5, etc. it is the average rating of all the customers rating

  rating: {
    type: Number,
    default: 0,
  },

  // these are the reviews that the customer will give me, contains the comment, rating, and user
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
      required: true,
    },
  ],

  // shippingOptions: [{ type: String }],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", ProductsSchema);
