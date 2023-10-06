const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  customerOrders: [
    {
      orderID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store",
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

  addressBook: [
    {
      name: { type: String, unique: true, required: true },
      country: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      area: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
