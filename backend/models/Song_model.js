const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
    {
        title: {
            type: String,
            required: true,

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
            required: true,

        },
        fileUrl: {
            type: String,
            required: true,

        },
        type:{
            type:String,
            required:true
        }
    },

);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
