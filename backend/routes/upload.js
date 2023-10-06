const express = require("express");
const router = express.Router();
const fetchUserID = require("../middleware/fetchuserID");
const imgur = require("imgur");
const fs = require("fs");

router.post("/", fetchUserID, (req, res) => {
  // Check if any files were uploaded
  if (!req.files) {
    return res.status(400).json({ error: "No files were uploaded." });
  }

  // Retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Define the path for saving the uploaded file
  let uploadPath = __dirname + "/../uploads/" + sampleFile.name;

  // Move the uploaded file to the specified path
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ error: "Error uploading file." });
    }

    // Upload the file to Imgur
    imgur
      .uploadFile(uploadPath)
      .then((json) => {
        // Check if the response from Imgur contains a valid link
        if (json && json.link) {
          fs.unlinkSync(uploadPath); // Remove the local file after successful upload
          res.json({ link: json.link }); // Send the Imgur link in the response
        } else {
          console.error("Invalid response from Imgur:", json);
          fs.unlinkSync(uploadPath); // Remove the local file on error
          res.status(500).json({ error: "Invalid response from Imgur." });
        }
      })
      .catch((err) => {
        console.error("Error uploading to Imgur:", err);
        fs.unlinkSync(uploadPath); // Remove the local file on error
        res.status(500).json({ error: "Error uploading to Imgur." });
      });
  });
});

module.exports = router;
