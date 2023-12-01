const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");
const multer = require("multer");
const path = require('path');
// const upload = multer({ dest: 'uploads/' }); // new path for uploading avatar
// const upload = multer({ dest: 'uploads/' });

// Set up multer to save files with original extensions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure the 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    // Extract the file extension and append it to the filename
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Use Date.now() to get a unique filename
  },
});

const upload = multer({ storage: storage });


router.get("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user data" });
    }
  });

  router.post("/upload-avatar", upload.single('avatar'), async (req, res) => {
    try {
      const userId = req.body.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Assuming the uploaded file's filename is stored in `req.file.filename`
      const avatarPath = `/uploads/${req.file.filename}`; // req.file.filename should include the extension
  user.avatar = avatarPath;
  await user.save();
  
      // Send the correct path back to the frontend
      res.json({ avatar: avatarPath });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      res.status(500).json({ message: "Error uploading avatar" });
    }
  });
  

module.exports = router;
