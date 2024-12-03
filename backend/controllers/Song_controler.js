const Song=require('../models/Song_model')
const {songValidationSchema}=require('../models/validation')
const CustomError = require('../utils/CustomError')



const addSongs=async(req,res,next)=>{
    const {value,error}=songValidationSchema.validate(req.body)
    if(error){
        return next(new CustomError(error))
    }
    const { title, artist, album, duration,type } =value;

    // Access uploaded files from req.files
    const audioFileUrl = req.files.audioFile[0].path; // Audio file
    const imageFileUrl = req.files.imageFile[0].path; // Image file

    // Create a new song document in the database
    const newSong = new Song({
        title,
        artist,
        album,
        duration,
        type,
        fileUrl: audioFileUrl,
        image: imageFileUrl,
    });

    await newSong.save();
    res.status(201).json(newSong);
}

module.exports={
    addSongs
}