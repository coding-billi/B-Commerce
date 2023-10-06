const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const fetchUserID = require("../middleware/fetchuserID");
const User = require("../models/User");

router.get("/fetchcart", fetchUserID, async (request, response) => {
  try {
    // Find the user by ID (excluding password)
    const user = await User.findById(request.user.id).select("-password");

    if (!user) {
      // If user is not found, return a 404 Not Found response
      return response.status(404).json({
        error: "User not found",
      });
    }

    // Find the cart for the user and populate items with product details
    const cart = await Cart.findOne({ user: request.user.id })
      .populate("items.product")
      .exec();

    if (!cart) {
      // If cart is not found, return a 404 Not Found response
      return response.status(404).json({ error: "Cart not found" });
    }

    // Send the items in the cart in the response
    response.json(cart.items);
  } catch (error) {
    console.error(error);
    // If an error occurs, return a 500 Internal Server Error response
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/addnewitemtocart/:productID",
  fetchUserID,
  async (request, response) => {
    try {
      // Extract product ID and quantity from the request
      const { productID } = request.params;
      const { quantity } = request.body;
      if (!productID || !quantity) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }
      // Find the user by ID (excluding password)
      const user = await User.findById(request.user.id).select("-password");

      if (!user) {
        // If user is not found, return a 404 Not Found response
        return response.status(404).json({
          error: "User not found",
        });
      }

      // Find the product by ID
      const product = await Product.findById(productID);

      if (!product) {
        // If product is not found, return a 404 Not Found response
        return response.status(404).json({ error: "Product not found" });
      }

      // Create a cart item with the product ID and quantity
      const cartItem = {
        product: productID,
        quantity: quantity,
      };

      // Find the user's cart and populate items with product details
      let cart = await Cart.findOne({ user: request.user.id })
        .populate("items.product")
        .exec();

      if (!cart) {
        // If cart is not found, return a 404 Not Found response
        return response.status(404).json({ error: "Cart not found" });
      }

      // Initialize totalItems and totalPrice
      let totalItems = cart.totalItems;
      let totalPrice = cart.totalPrice;

      // Check if a cart already exists for the user
      if (cart) {
        totalItems = cart.totalItems;
        totalPrice = cart.totalPrice;
      }

      if (!cart) {
        // Create a new cart if one doesn't exist for the user
        const newCart = new Cart({
          user: request.user.id,
          items: [cartItem],
        });
        await newCart.save();
      } else {
        // Check if the product is already in the cart
        const existingProduct = cart.items.find(
          (item) => item.product._id.toString() === productID
        );

        if (existingProduct) {
          return response.status(400).json({
            error: "Product already added to cart",
          });
        }

        // Add the item to an existing cart
        cart.items.push(cartItem);
        await cart.save();
      }

      // Send the cart in the response
      response.json({ cart });
    } catch (error) {
      console.error(error);
      // If an error occurs, return a 500 Internal Server Error response
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete(
  "/removeitemfromcart/:productID",
  fetchUserID,
  async (request, response) => {
    try {
      // Extract product ID from the request
      const { productID } = request.params;
      if (!productID) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Find the user by ID (excluding password)
      const user = await User.findById(request.user.id).select("-password");

      if (!user) {
        // If user is not found, return a 404 Not Found response
        return response.status(404).json({
          error: "User not found",
        });
      }

      // Find the cart for the user
      const cart = await Cart.findOne({ user: request.user.id });

      if (!cart) {
        // If cart is not found, return a 404 Not Found response
        return response.status(404).json({ error: "Cart not found" });
      }

      // Find the index of the item in the cart's items array
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productID
      );

      if (itemIndex === -1) {
        // If item is not found in cart, return a 404 Not Found response
        return response.status(404).json({ error: "Item not found in cart" });
      }

      // Remove the item from the cart
      cart.items.splice(itemIndex, 1);
      await cart.save();

      // Send the updated cart in the response
      response.json({ cart });
    } catch (error) {
      console.error(error);
      // If an error occurs, return a 500 Internal Server Error response
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
