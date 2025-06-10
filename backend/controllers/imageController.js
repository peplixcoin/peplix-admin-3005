const Image = require("../models/Image");
const fs = require("fs");

exports.uploadImage = async (req, res) => {
    try {
        // Delete existing image if any
        await Image.deleteMany();

        const newImage = new Image({
            image: {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype,
            },
        });
        await newImage.save();
        res.status(201).json({ message: "Image uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Image upload failed", error });
    }
};

exports.getImage = async (req, res) => {
    try {
        const image = await Image.findOne();
        if (!image) return res.status(404).json({ message: "No image found" });
        res.contentType(image.image.contentType);
        res.send(image.image.data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving image", error });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        await Image.deleteMany();
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Image deletion failed", error });
    }
};
