const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, 
    name: {
        type: String,
        required: true
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Song" 
        }]
    
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
