const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const multer = require("multer");
const upload = multer({ dest: 'uploads/' }); // new path for uploading avatar
=======
const { User } = require("../models/User.js");
>>>>>>> master

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

router.post("/upload-avatar", upload.single('avatar'), (req, res) => {
    res.status(200).json({ message: "Avatar uploaded successfully!" });
});

module.exports = router;
