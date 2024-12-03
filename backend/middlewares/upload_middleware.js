const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage for audio files
const audioStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "songs/audio",
        resource_type: "raw",
        allowed_formats: ["mp3", "wav", "ogg", "m4a"],
    },
});

// Set up storage for image files
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "songs/images",
        resource_type: "image",
        allowed_formats: ["png", "jpg", "jpeg"],
    },
});

// Initialize multer for both file types
const upload = multer({
    storage: multer.diskStorage({}),
}).fields([
    { name: "audioFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
]);

// Middleware to process the uploads
const uploadSong = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(500).json({ message: "Error uploading files", err });
        }
        console.log("Files uploaded successfully:", req.files);
        next();
    });
};

module.exports = uploadSong;
