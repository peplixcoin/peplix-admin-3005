const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadImage, getImage, deleteImage } = require("../controllers/imageController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getImage);
router.delete("/", deleteImage);

module.exports = router;
