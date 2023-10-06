const express = require("express");
const router = express.Router();
const Store = require("../models/Store");
const Product = require("../models/Products");
const User = require("../models/User");
const fetchUserID = require("../middleware/fetchuserID");
const mongoose = require("mongoose");

router.post(
  "/placeorder/:storeID/:productID/:addressID",
  fetchUserID,
  async (request, response) => {
    try {
      // Extract necessary information from request
      const { quantity, paymentOption } = request.body;
      const { storeID, productID, addressID } = request.params;
      if (!quantity || !paymentOption || !storeID || !productID || !addressID) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Find user, store, and product by their IDs
      const user = await User.findById(request.user.id)
        .select("-password")
        .exec();
      const store = await Store.findById(storeID).exec();
      const product = await Product.findById(productID).exec();

      // Check if user, store, and product exist
      if (!user) {
        return response.status(404).json({
          error: "User not found",
        });
      }

      if (!store) {
        return response.status(404).json({
          error: "Store not found",
        });
      }

      if (!product) {
        response.status(404).json({
          error: "Product not found",
        });
      }

      // Generate a unique order ID
      const orderID = new mongoose.Types.ObjectId();

      const order = {
        orderID, // Assign the generated ID to the order
        user: user._id,
        store: store._id,
        product: product._id,
        address: addressID,
        quantity,
        paymentOption,
        progress: "Order Placed",
      };

      // Create modified order objects for user and store
      const userOrder = { ...order, user: undefined };
      const storeOrder = { ...order, store: undefined };

      // Save the order to the user and the store
      user.customerOrders.push(userOrder);
      store.storeOrders.push(storeOrder);

      // Save changes to both the user and the store
      await user.save();
      await store.save();

      // Return a response indicating the order was placed successfully
      response.json(order);
    } catch (error) {
      console.error(error);
      // If an error occurs, return a 500 Internal Server Error response
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.put("/updateorder/:orderID", fetchUserID, async (request, response) => {
  try {
    // Extract necessary information from the request
    const { progress } = request.body;
    const { orderID } = request.params;
    if (!orderID || !progress) {
      return response
        .status(400)
        .json({ error: "Please fill the required fields" });
    }

    // Find the store containing the order
    const store = await Store.findOne({
      "storeOrders.orderID": orderID,
    }).exec();

    // Find the user associated with the order
    const user = await User.findOne({
      "customerOrders.orderID": orderID,
    })
      .select("-password")
      .exec();

    // Check if user exists
    if (!user) {
      return response.status(404).json({
        error: "User not found",
      });
    }

    // Check if store exists
    if (!store) {
    return response.status(404).json({
      error: "Store not found",
    });
    }

    // Find the index of the order in user's customerOrders
    const orderIndexUser = user.customerOrders.findIndex(
      (order) => order.orderID.toString() === orderID
    );

    // Find the index of the order in store's storeOrders
    const orderIndexStore = store.storeOrders.findIndex(
      (order) => order.orderID.toString() === orderID
    );

    if (orderIndexUser !== -1 && orderIndexStore !== -1) {
      // Update the progress of the order in both user's customerOrders and store's storeOrders
      user.customerOrders[orderIndexUser].progress = progress;
      store.storeOrders[orderIndexStore].progress = progress;

      // Save changes to both the user and the store
      await user.save();
      await store.save();

      // Return the updated progress in the response
      response.json(progress);
    } else {
      // If the order is not found, return a 404 Not Found response
      response.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    // If an error occurs, return a 500 Internal Server Error response
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
