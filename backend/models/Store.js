const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  categories: {
    type: [String],
    default: ["All"],
  },

  images: [String], // Array of image URLs

  bemail: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  Instagram: {
    type: String,
  },

  Tiktok: {
    type: String,
  },

  Youtube: {
    type: String,
  },

  LinkedIn: {
    type: String,
  },

  Twitter: {
    type: String,
  },

  Facebook: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  inventory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  ],

  storeOrders: [
    {
      orderID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      address: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      progress: {
        type: String,
      },

      paymentOption: {
        type: String,
        required: true,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("store", StoreSchema);
