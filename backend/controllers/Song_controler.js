const { findByIdAndUpdate } = require('../models/Likedsongs')
const Song=require('../models/Song_model')
const {songValidationSchema}=require('../models/validation')
const CustomError = require('../utils/CustomError')



const addSongs = async (req, res, next) => {
    const { value, error } = songValidationSchema.validate(req.body);

    if (error) {
        return next(new CustomError(error)); // Handle validation error
    }

    const { title, artist, album, duration, type } = value;

    // Extract Cloudinary URLs from req.files
    const audioFileUrl = req.files.audioFile[0].path; // Cloudinary URL for the audio file
    const imageFileUrl = req.files.imageFile[0].path; // Cloudinary URL for the image file

    // Create a new song document
    const newSong = new Song({
        title,
        artist,
        album,
        duration,
        type,
        fileUrl: audioFileUrl,
        image: imageFileUrl,
    });

    // Save the song document to MongoDB
    await newSong.save();

    // Send success response
    res.status(201).json(newSong);
};

//edit song
// ---------------------------------------------------------------------------------------------------------

const editSong = async (req, res, next) => {
    try {
       
         const { value, error } = songValidationSchema.validate(req.body);

        if (error) {
            return next(new CustomError(error.details[0].message, 400));
        }
            const updatedData = { ...value };

        if (req.files?.imageFile?.[0]?.path) {
            updatedData.imageFile = req.files.imageFile[0].path;
        } else if (!value.imageFile) {
            delete updatedData.imageFile; 
        }

        if (req.files?.audioFile?.[0]?.path) {
            updatedData.audioFile = req.files.audioFile[0].path;
        } else if (!value.audioFile) {
            delete updatedData.audioFile; 
        }

        const updatedSong = await Song.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedSong) {
            return next(new CustomError('Song not found', 404));
        }

        res.status(200).json({
            message: 'Song updated successfully',
            song: updatedSong,
        });
    } catch (err) {
        next(err);
    }
};

const delete_song=async(req,res,next)=>{
    const{id}=req.params
    const song=await Song.findByIdAndDelete(id)
    if(!song){
        return next(new CustomError('song not found',400))
    }
    res.status(200).json({song:song,message:"song deleted successfully"})
}








module.exports={
    addSongs,
    editSong,
    delete_song,
    
}