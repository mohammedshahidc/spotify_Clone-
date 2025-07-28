const { required, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
    {
        title: {
            type: String,

        },
        artist: {
            type: String,
            required: true,

        },
        album: {
            type: String,
            required: true,

        },
        duration: {
            type: Number,
            required: true,
            min: 1,
        },
        image: {
            type: String,
           

        },
        fileUrl: {
            type: String,
            

        },
        type:{
            type:String,
            required:true
        },
        artistImage:{
            type:String
        }
    },

);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
