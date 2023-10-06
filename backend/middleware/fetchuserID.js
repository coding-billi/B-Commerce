const jwt = require("jsonwebtoken");

// Define a middleware function to fetch the user ID from the auth-token
const fetchUserID = async (request, response, next) => {
  // Retrieve the token from the request headers
  const token = request.header("auth-token");

  // If no token is provided, return an unauthorized response
  if (!token) {
    return response.status(401).send({
      error: "Please provide a valid auth-token. Login to get your auth-token.",
    });
  }

  try {
    // Verify the token using the secret key to extract user information
    const data = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);

    // Attach the user information to the request object for later use
    request.user = data.user;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    // If there's an error verifying the token, return an unauthorized response
    response.status(401).send({
      error: "Please provide a valid auth-token. Login to get your auth-token.",
    });
  }
};

// Export the fetchUserID middleware for use in other parts of the application
module.exports = fetchUserID;
