const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  name: {
    type: String,
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

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("review", ReviewSchema);
