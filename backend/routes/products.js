const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const Store = require("../models/Store");
const fetchUserID = require("../middleware/fetchuserID");

router.get(
  "/fetchProduct/:productID",
  async (request, response) => {
    try {
      const { productID } = request.params;
      if (!productID) {
       return response
         .status(400)
         .json({ error: "Please fill the required fields" });
      }
      // Find the product by its ID and populate its reviews
      let product = await Product.findById(productID)
        .populate("reviews")
        .exec();

      // Check if the product exists
      if (!product) {
       return response.status(404).send("Product not found");
      }

      // Send the product as the response
      response.send(product);
    } catch (error) {
      console.error(error);
      // If an error occurs, it will be logged and not further handled
      response.status(500).json({eror: "Internal Server Error"})
    }
  }
);

router.get("/fetchAllProductsPublic", async (request, response) => {
  try {
    // Find all products and populate their reviews
    const productsList = await Product.find().populate("reviews").exec();

    // Send the list of products as the response
    response.send(productsList);
  } catch (error) {
    console.error(error);
    // If an error occurs, it will be logged and a 500 Internal Server Error response will be sent
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addnewproduct", fetchUserID, async (request, response) => {
  try {
    // Extract necessary information from the request body
    const {
      title,
      description,
      category,
      price,
      images,
      stockQuantity,
      rating,
    } = request.body;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !images ||
      !stockQuantity ||
      !rating
    ) {
     return response
       .status(400)
       .json({ error: "Please fill the required fields" });
    }

    // Find the store associated with the seller
    const sellerStore = await Store.findOne({ user: request.user.id });

    // Check if the seller's store exists
    if (!sellerStore) {
      return response.status(404).json({ error: "Store not found" });
    }

    // Create a new product with the provided information
    let newProduct = await Product.create({
      title,
      description,
      store: sellerStore._id,
      category,
      price,
      images,
      stockQuantity,
      rating,
    });

    // Add the new product to the seller's store inventory
    sellerStore.inventory.push(newProduct._id);
    await sellerStore.save();

    // Send the newly created product as the response
    response.send(newProduct);
  } catch (error) {
    console.error(error);
    // If an error occurs, it will be logged and not further handled
    response.status(500).json({eror: "Internal Server Error"})
  }
});

router.put(
  "/updateproduct/:productID",
  fetchUserID,
  async (request, response) => {
    try {
      // Extract necessary information from the request body
      const {
        title,
        description,
        category,
        price,
        images,
        stockQuantity,
        rating,
      } = request.body;

      const { productID } = request.params;
      if (
        !title ||
        !description ||
        !category ||
        !price ||
        !images ||
        !stockQuantity ||
        !rating ||
        !productID
      ) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Create an empty object to store the properties to be updated
      const productToBeSent = {};

      // Check if each property exists, and if so, add it to the update object
      if (title) {
        productToBeSent.title = title;
      }
      if (description) {
        productToBeSent.description = description;
      }
      if (category) {
        productToBeSent.category = category;
      }
      if (price) {
        productToBeSent.price = price;
      }
      if (images) {
        productToBeSent.images = images;
      }
      if (stockQuantity) {
        productToBeSent.stockQuantity = stockQuantity;
      }
      if (rating) {
        productToBeSent.rating = rating;
      }

      // Find the product by its ID
      let product = await Product.findById(productID);

      // Find the store associated with the product
      const store = await Store.findById(product.store);

      // Check if the store exists
      if (!store) {
        return response.status(404).json({ error: "Store not found" });
      }

      // Check if the product exists
      if (!product) {
        return response.status(404).json({ error: "Product not found" });
      }

      // Update the product with the provided information
      product = await Product.findByIdAndUpdate(
        productID,
        { $set: productToBeSent },
        { new: true }
      );

      // Send the updated product as the response
      response.json({ product });
    } catch (error) {
      console.error(error);
      // If an error occurs, it will be logged and not further handled
      response.status(500).json({error: "Itnernal Server Error"})
    }
  }
);

router.delete(
  "/deleteproduct/:productID",
  fetchUserID,
  async (request, response) => {
    try {
      const { productID } = request.params;
      if (
        !title ||
        !description ||
        !category ||
        !price ||
        !images ||
        !stockQuantity ||
        !rating ||
        !productID
      ) {
      return response
        .status(400)
        .json({ error: "Please fill the required fields" });
      }

      // Find the product by its ID
      let product = await Product.findById(productID);

      // Find the store associated with the product
      const store = await Store.findById(product.store);

      // Check if the store exists
      if (!store) {
        return response.status(404).json({ error: "Store not found" });
      }

      // Check if the product exists
      if (!product) {
        return response.status(404).send("Product not found");
      }

      // Delete the product by its ID
      product = await Product.findByIdAndDelete(productID);

      // Send a response indicating successful deletion
      response.json({
        product,
        success: `Successfully deleted the product for ${product._id}`,
      });
    } catch (error) {
      console.error(error);
      // If an error occurs, it will be logged and not further handled
      response.status(500).json({error: "Internal Server Error"})
    }
  }
);

module.exports = router;
