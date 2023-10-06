const express = require("express");
const router = express.Router();
const Products = require("../models/Products");
const Review = require("../models/Reviews");
const User = require("../models/User");
const fetchUserID = require("../middleware/fetchuserID");

router.get("/fetchreview/:reviewID", fetchUserID, async (request, response) => {
  try {
    const { reviewID } = request.params;
    if (!reviewID) {
      return response
        .status(400)
        .json({ error: "Please fill the required fields" });
    }
    // Find the review by its unique ID
    const review = await Review.findOne({ _id: request.params.reviewID });

    // Check if the review exists
    if (!review) {
      return response.status(404).json({ message: "Review not found" });
    }

    // Send the review as the response
    response.json(review);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

router.get(
  "/fetchstorereviews/:storeID",
  fetchUserID,
  async (request, response) => {
    try {
      const { storeID } = request.params;
      if (!storeID) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }
      // Find all reviews associated with the specified store ID
      const reviewsList = await Review.find({ store: storeID });

      // Check if any reviews were found
      if (!reviewsList) {
        return response.status(404).json({ message: "Reviews not found" });
      }

      // Send the list of reviews as the response
      response.json(reviewsList);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get(
  "/fetchproductreviews/:productID",
  fetchUserID,
  async (request, response) => {
    try {
      const { productID } = request.params;
      if (!productID) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }
      // Find all reviews associated with the specified product ID
      const reviewsList = await Review.find({
        product: productID,
      });

      // Check if any reviews were found
      if (!reviewsList) {
        return response.status(404).json({ message: "Reviews not found" });
      }

      // Send the list of reviews as the response
      response.json(reviewsList);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/createreview/:storeID/:productID",
  fetchUserID,
  async (request, response) => {
    try {
      const { rating, comment } = request.body;
      const { productID, storeID } = request.params;
      // first check if the user has bought the product or not? then only can he the review product

      // Find the user
      const user = await User.findById(request.user.id);

      // Check if the user has bought the product and it's delivered
      const hasBoughtAndDelivered = user.customerOrders.some((order) => {
        return (
          order.product.toString() === productID &&
          order.progress === "Delivered"
        );
      });

      if (!hasBoughtAndDelivered) {
        return response.status(401).json({
          error:
            "You can only review a product if you have bought it and it is delivered",
        });
      }

      if (!productID || !rating || !comment || !storeID) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Check if the user has already reviewed this product
      const review = await Review.findOne({
        product: productID,
        user: request.user.id,
      });

      if (review) {
        return response.status(409).json({
          error: "You have already reviewed this product",
        });
      }

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      // Create a new review
      let reviewToBeSent = await Review.create({
        name: user.name,
        rating: rating,
        comment: comment,
        product: productID,
        store: storeID,
        user: request.user.id,
      });

      // Find the product
      const product = await Products.findOne({ _id: productID });

      if (!product) {
        return response.status(404).json({ message: "Product not found" });
      }

      // Add the review to the product
      product.reviews.push(reviewToBeSent._id);
      await product.save();

      // Calculate the total rating and average rating for the product
      const reviewsList = await Review.find({
        product: productID,
      });
      const totalRating = reviewsList.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating =
        reviewsList.length > 0
          ? (totalRating / reviewsList.length).toFixed(1)
          : 0;

      // Update the product's rating
      product.rating = averageRating;
      await product.save();

      // Send the created review as the response
      response.json(reviewToBeSent);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.put(
  "/updatereview/:reviewID",
  fetchUserID,
  async (request, response) => {
    try {
      const { rating, comment } = request.body;
      const { reviewID } = request.params;

      if (!reviewID || !rating || !comment) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Find the review by its ID
      let review = await Review.findById(reviewID);

      if (!review) {
        return response.status(404).json({ error: "Review not found" });
      }

      // Check if the user is the author of the review
      if (review.user.toString() !== request.user.id) {
        return response.status(401).json({ error: "Not allowed" });
      }

      // Create a new review object with updated data
      let newReview = {
        rating: rating,
        comment: comment,
      };

      // Update the review with the new data
      review = await Review.findByIdAndUpdate(
        reviewID,
        { $set: newReview },
        { new: true }
      );

      // Find the associated product
      const product = await Products.findOne({ _id: review.product });

      if (!product) {
        return response.status(404).json({ message: "Product not found" });
      }

      // Calculate total rating and average rating for the product
      const reviews = await Review.find({
        product: review.product,
      });
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating =
        reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

      // Update the product's rating
      product.rating = averageRating;
      await product.save();

      // Send the updated review as the response
      response.json(newReview);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Errror" });
    }
  }
);

module.exports = router;
