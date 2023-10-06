const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUserID = require("../middleware/fetchuserID");

router.post(
  "/createuser",
  [
    // Validation checks using express-validator
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 4 }),
    body("cpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (request, response) => {
    try {
      // Validate input data using express-validator
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      // Extract user data from the request body
      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Check if a user with the provided email already exists
      const user = await User.findOne({ email });
      if (user) {
        return response.status(409).json({
          error: "Email already exists",
        });
      }

      // Generate a salt and hash the password for security
      let salt = await bcrypt.genSalt(10);
      let securePass = await bcrypt.hash(password, salt);

      // Create a new user in the database
      let newUser = await User.create({
        name: name,
        email: email,
        password: securePass,
      });

      // Send the newly created user in the response
      response.json(newUser);
    } catch (error) {
      console.error("Error:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  [
    // Validation checks using express-validator
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (request, response) => {
    // Check for validation errors
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    // Extract email and password from request body
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ error: "Please fill the required fields" });
    }

    try {
      // Find the user by their email
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(404).json({
          error: "User not found",
        });
      }

      // Compare provided password with hashed password in database
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return response.status(401).json({ error: "Wrong password" });
      }

      // If authentication is successful, create JWT token
      const data = {
        user: {
          id: user._id,
        },
      };

      const token = jwt.sign(data, process.env.AUTH_TOKEN_SECRET);

      // Send the token in the response
      response.json({ token: token });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.put("/addaddress", fetchUserID, async (request, response) => {
  try {
    // Fetch the user by ID, excluding the password field
    const user = await User.findById(request.user.id).select("-password");
    if (!user) {
      return response.status(404).json({
        error: "User not found",
      });
    }

    // Check if the user's addressBook has reached the maximum limit (9 addresses)
    if (user.addressBook.length >= 9) {
      return response
        .status(400)
        .json({ error: "Address limit reached (max: 9)" });
    }

    // Extract address details from the request body
    const { name, country, city, state, area, address, phone } = request.body;
    if (!name || !country || !city || !state || !area || !address || !phone) {
      return response
        .status(400)
        .json({ error: "Please fill the required fields" });
    }

    // Prepare the address object to be saved
    const addressToBeSaved = {};

    if (name) {
      addressToBeSaved.name = name;
    }
    if (country) {
      addressToBeSaved.country = country;
    }
    if (city) {
      addressToBeSaved.city = city;
    }
    if (state) {
      addressToBeSaved.state = state;
    }
    if (area) {
      addressToBeSaved.area = area;
    }
    if (address) {
      addressToBeSaved.address = address;
    }
    if (phone) {
      addressToBeSaved.phone = phone;
    }

    // Update the user's addressBook by pushing the new address
    const updatedUser = await User.findByIdAndUpdate(
      request.user.id,
      { $push: { addressBook: addressToBeSaved } },
      { new: true }
    );

    // Send the updated user object in the response
    response.json(updatedUser);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.put(
  "/updateaddress/:addressId",
  fetchUserID,
  async (request, response) => {
    try {
      // Extract address details from the request body and addressId from the route params
      const { name, country, city, state, area, address, phone } = request.body;
      const { addressId } = request.params;
      if (
        !name ||
        !country ||
        !city ||
        !state ||
        !area ||
        !address ||
        !phone ||
        !addressId
      ) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Check if the user's addressBook has reached the maximum limit (9 addresses)
      if (user.addressBook.length > 9) {
        return response
          .status(400)
          .json({ error: "Address limit reached (max: 9)" });
      }

      // Prepare the final address object to be updated
      const finalAddress = {};

      if (name) {
        finalAddress.name = name;
      }
      if (country) {
        finalAddress.country = country;
      }
      if (city) {
        finalAddress.city = city;
      }
      if (state) {
        finalAddress.state = state;
      }
      if (area) {
        finalAddress.area = area;
      }
      if (address) {
        finalAddress.address = address;
      }
      if (phone) {
        finalAddress.phone = phone;
      }

      // Find and update the address in the user's addressBook
      const user = await User.findOneAndUpdate(
        {
          _id: request.user.id,
          "addressBook._id": addressId,
        },
        {
          $set: {
            "addressBook.$": finalAddress,
          },
        },
        { new: true }
      ).select("-password");

      // Check if user or address was not found
      if (!user) {
        return response.status(404).json({
          error: "User or Address not found",
        });
      }

      // Send the updated user object in the response
      response.json(user);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete(
  "/deleteaddress/:addressId",
  fetchUserID,
  async (request, response) => {
    try {
      // Extract addressId from the route parameters
      const { addressId } = request.params;
      if (!addressId) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Find and update the user by removing the specified address
      const user = await User.findByIdAndUpdate(
        request.user.id,
        {
          $pull: {
            addressBook: { _id: addressId },
          },
        },
        { new: true }
      ).select("-password");

      // Check if user or address was not found
      if (!user) {
        return response.status(404).json({
          error: "User or Address not found",
        });
      }

      // Send the updated user object in the response
      response.json(user);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/fetchaddress/:userID/:addressId",
  fetchUserID,
  async (request, response) => {
    try {
      // Extract addressId and userID from the route parameters
      const { addressId, userID } = request.params;
      if (!userID || !addressId) {
        return response
          .status(400)
          .json({ error: "Please fill the required fields" });
      }

      // Find the user by their ID
      const user = await User.findOne({ _id: userID });

      if (user) {
        // Find the address in the user's addressBook
        const address = user.addressBook.find(
          (address) => address._id.toString() === addressId
        );

        if (address) {
          // If address is found, send it in the response
          response.json(address);
        } else {
          // If address is not found, return a 404 Not Found response
          return response.status(404).json({ message: "Address not found" });
        }
      } else {
        // If user is not found, return a 404 Not Found response
        return response.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      // If an error occurs, return a 500 Internal Server Error response
      response.status(500).json({ message: "Inernal Server Error" });
    }
  }
);

router.get("/getuser", fetchUserID, async (request, response) => {
  try {
    // Extract user ID from the request
    const userID = request.user.id;

    // Validate if the user exists by ID (excluding password)
    const userValidation = await User.findById(userID).select("-password");

    if (!userValidation) {
      // If user is not found, return a 404 Not Found response
      return response.status(404).json({
        error: "User not found",
      });
    }

    // Find the user by ID (excluding password) and populate customerOrders
    const user = await User.findById(userID)
      .select("-password")
      .populate({
        path: "customerOrders",
        populate: [{ path: "store" }, { path: "product" }],
      });

    // Send the user object in the response
    response.send(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Inernal Server Error" });
  }
});

module.exports = router;
