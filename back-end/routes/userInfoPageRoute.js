const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' }); // new path for uploading avatar

router.get("/", (req, res) => {
    // fetch user information and send it as a JSON response
    const userInfoData = {
        id: 1,
        name: 'Bryn',
        email: 'btaylot0@booking.com',
        avatar: 'https://robohash.org/utetquibusdam.png?size=50x50&set=set1',
        user: [
            {
                id: 2,
                name: 'Jdavie',
                email: 'jzecchinii0@yahoo.co.jp',
            },
            {
                id: 3,
                name: 'Emmie',
                email: 'esworder1@xinhuanet.com',
            },
        ],
    };
  
    res.json(userInfoData);
});

router.post("/upload-avatar", upload.single('avatar'), (req, res) => {
    res.status(200).json({ message: "Avatar uploaded successfully!" });
});

module.exports = router;
