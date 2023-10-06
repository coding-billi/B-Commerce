const express = require("express");
const router = express.Router();
const Store = require("../models/Store");
const Product = require("../models/Products");
const fetchUserID = require("../middleware/fetchuserID");

router.get("/fetchstore", fetchUserID, async (request, response) => {
  try {
    // Find the store associated with the authenticated user
    const store = await Store.findOne({ user: request.user.id })
      .populate("inventory") // Populate the 'inventory' field to get product details
      .populate({
        path: "storeOrders", // Populate the 'storeOrders' field to get order details
        populate: [{ path: "user" }, { path: "product" }], // Populate user and product details in storeOrders
      })
      .exec();

    // If no store is found, return a 404 error
    if (!store) {
      return response.status(404).json({ error: "Store not found" });
    }

    // Send the store information as the response
    response.json(store);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.get("/fetchallstores", async (request, response) => {
  try {
    // Find all stores in the database
    const storesList = await Store.find();

    // If no stores are found, return a 404 error
    if (!storesList) {
      return response.status(404).json({ error: "Store not found" });
    }

    // Send the list of stores as the response
    response.send(storesList);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/createstore", fetchUserID, async (request, response) => {
  try {
    // Extracting properties from the request body
    const {
      name,
      description,
      bemail,
      categories,
      phone,
      images,
      country,
      Instagram,
      Tiktok,
      Youtube,
      LinkedIn,
      Twitter,
      Facebook,
    } = request.body;
    if (
      !name ||
      !description ||
      !bemail ||
      !categories ||
      !phone ||
      !images ||
      !country ||
      !Instagram ||
      !Tiktok ||
      !Youtube ||
      !LinkedIn ||
      !Twitter ||
      !Facebook
    ) {
      return response
        .status(400)
        .json({ error: "Please fill the required fields" });
    }

    // Check if a store with the same name or email already exists
    const store = await Store.findOne({
      $or: [{ name: name }, { bemail: bemail }],
    });

    // If a store with the same name or email exists, return a conflict response
    if (store) {
      return response.status(409).json({
        error: "Name or email must be unique",
      });
    }

    // Create a new store
    let newStore = await Store.create({
      name: name,
      description: description,
      categories: categories,
      bemail: bemail,
      phone: phone,
      images: images,
      country: country,
      Instagram: Instagram,
      Tiktok: Tiktok,
      Youtube: Youtube,
      LinkedIn: LinkedIn,
      Twitter: Twitter,
      Facebook: Facebook,
      user: request.user.id, // Assigning the user ID to the new store
    });

    // Send the newly created store as the response
    response.json(newStore);
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updatestore/:storeID", fetchUserID, async (request, response) => {
  try {
    // Extracting properties from the request body
    const {
      name,
      description,
      categories,
      bemail,
      phone,
      country,
      images,
      Instagram,
      Tiktok,
      Youtube,
      LinkedIn,
      Twitter,
      Facebook,
    } = request.body;
    const { storeID } = request.params;
    if (
      !name ||
      !description ||
      !bemail ||
      !categories ||
      !phone ||
      !images ||
      !country ||
      !Instagram ||
      !Tiktok ||
      !Youtube ||
      !LinkedIn ||
      !Twitter ||
      !Facebook ||
      !storeID
    ) {
      return response
        .status(400)
        .json({ error: "Please fill the required fields" });
    }

    // Creating an object to store updated store properties
    const newStore = {};

    // Checking if each property is provided in the request body, and adding it to newStore if so
    if (name) {
      newStore.name = name;
    }
    if (description) {
      newStore.description = description;
    }
    if (categories) {
      newStore.categories = categories;
    }
    if (bemail) {
      newStore.bemail = bemail;
    }
    if (phone) {
      newStore.phone = phone;
    }
    if (country) {
      newStore.country = country;
    }
    if (images) {
      newStore.images = images;
    }
    if (Instagram) {
      newStore.Instagram = Instagram;
    }
    if (Tiktok) {
      newStore.Tiktok = Tiktok;
    }
    if (Youtube) {
      newStore.Youtube = Youtube;
    }
    if (LinkedIn) {
      newStore.LinkedIn = LinkedIn;
    }
    if (Twitter) {
      newStore.Twitter = Twitter;
    }
    if (Facebook) {
      newStore.Facebook = Facebook;
    }

    // Finding the store by its ID
    let store = await Store.findById(storeID);

    // If the store is not found, return a 404 error response
    if (!store) {
      return response.status(404).json({ error: "Store not found" });
    }

    // Checking if the user making the request is the owner of the store
    if (store.user.toString() !== request.user.id) {
      return response.status(401).json({ error: "Not allowed" });
    }

    // Updating the store with newStore properties
    store = await Store.findByIdAndUpdate(
      storeID,
      { $set: newStore },
      { new: true }
    );

    // Sending the updated store properties as the response
    response.json(newStore);
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deletestore/:id", fetchUserID, async (request, response) => {
  try {
    const { storeID } = request.params;
    if (!storeID) {
      return response
        .status(400)
        .json({ error: "Please fill the required fields" });
    }
    let store = await Store.findById(storeID);

    if (!store) {
      return response.status(404).send("Store not found");
    }

    if (store.user.toString() !== request.user.id) {
      return response.status(401).send("Not allowed");
    }

    // Find and delete associated products
    await Product.deleteMany({ _id: { $in: store.inventory } });

    // Now, delete the store
    store = await Store.findByIdAndDelete(storeID);

    response.json({
      store,
      success: `Successfully deleted the store for ${store._id}`,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
