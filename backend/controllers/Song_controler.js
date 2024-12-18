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


let currentSongIndex = -1; // Initialize current song index
let isPlaying = false; // Initialize playing status
const songs = []; // Array to hold all songs

// Get the list of songs (you can implement this function to fetch from the database)
const getSongsList = async () => {
    return await Song.find(); // Assuming you have a function to get songs from the database
};

// Select a song by index
const selectSong = (req, res, next) => {
    const { index } = req.body; // Get index from the request body
    if (index < 0 || index >= songs.length) {
        return next(new CustomError('Invalid song index', 400));
    }
    currentSongIndex = index; // Set current song index
    isPlaying = true; // Set playing status to true
    const currentSong = songs[currentSongIndex];
    res.status(200).json({ message: 'Song selected', currentSong });
};

// Get the current song
const getCurrentSong = (req, res, next) => {
    const currentSong = currentSongIndex >= 0 ? songs[currentSongIndex] : null;
    res.status(200).json({ currentSong, isPlaying, currentSongIndex, totalSongs: songs.length });
};

// Play the current song
const playSong = (req, res, next) => {
    isPlaying = true; // Update playing status
    res.status(200).json({ message: 'Playing song' });
};

// Pause the current song
const pauseSong = (req, res, next) => {
    isPlaying = false; // Update playing status
    res.status(200).json({ message: 'Paused song' });
};

// Play the next song
const nextSong = (req, res, next) => {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to the next song
    const currentSong = songs[currentSongIndex];
    res.status(200).json({ currentSong });
};

// Play the previous song
const previousSong = (req, res, next) => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Move to the previous song
    const currentSong = songs[currentSongIndex];
    res.status(200).json({ currentSong });
};






module.exports={
    addSongs,
    editSong,
    delete_song,
    selectSong,
    getCurrentSong,
    playSong,
    pauseSong,
    nextSong,
    previousSong
}