const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage for audio files
const audioStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'songs/audio',
        resource_type: 'raw', // For audio files
        allowed_formats: ['mp3', 'wav', 'ogg', 'm4a'],
    },
});

// Define storage for image files
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'songs/images',
        resource_type: 'image', // For image files
        allowed_formats: ['png', 'jpg', 'jpeg'],
    },
});

// Configure multer with Cloudinary storage
const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
            if (file.fieldname === 'audioFile') {
                return {
                    folder: 'songs/audio',
                    resource_type: 'raw',
                    allowed_formats: ['mp3', 'wav', 'ogg', 'm4a'],
                };
            }
            if (file.fieldname === 'imageFile') {
                return {
                    folder: 'songs/images',
                    resource_type: 'image',
                    allowed_formats: ['png', 'jpg', 'jpeg'],
                };
            }
        },
    }),
}).fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 },
    { name: 'profilePicture', maxCount: 1 },
]);

module.exports = upload;
