const { userValidationSchema, userLoginValidationSchema } = require('../models/validation')
const User = require('../models/User_model')
const CustomError = require('../utils/CustomError')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/emailService')
const jwt = require('jsonwebtoken')
const Song = require('../models/Song_model')
const Playlist = require('../models/Playlist_model')
const LikedSongs = require('../models/Likedsongs')






//user registration
// ---------------------------------------------------------------------------------------------------------




const user_registration = async (req, res, next) => {

    const { value, error } = userValidationSchema.validate(req.body)
    const { name, email, password, cpassword } = value

    if (error) {
        console.log('registration error:', error);
        return next(new CustomError('registration error', error))
    }
    if (password !== cpassword) {
        return next(new CustomError('invalid password', 404))
    }
    const hashpassword = await bcrypt.hash(password, 6)


    const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
    console.log(otp);
    const new_user = new User({ name, email, password: hashpassword, cpassword: hashpassword, otp, isVerified: false })
    await new_user.save()

    const emailTemplate = `
     <h1>Welcome, ${name}!</h1>
     <p>Your OTP for email verification is:</p>
     <h2>${otp}</h2>
     <p>Please use this OTP to verify your email.</p>`;

    await sendEmail(email, 'Verify Your Email with OTP', emailTemplate);

    res.status(200).json({ errorcode: 0, status: true, msg: "User registered successfully. Please check your email for the OTP.", new_user })
}


//email verification
// ---------------------------------------------------------------------------------------------------------



const verify_otp = async (req, res, next) => {

    const { otp } = req.body
    if (!otp) {
        return next(new CustomError(' OTP is required', 400))
    }
    console.log('otp:', otp);
    const user = await User.findOne({ otp })
    console.log('user:', user);
    if (!user) {
        return next(new CustomError('User not found', 404))
    }

    user.isVerified = true
    user.otp = null


    await user.save()

    res.status(200).json({
        errorcode: 0,
        status: true,
        msg: 'Email verified successfully.',
    });
}



//user login
// ---------------------------------------------------------------------------------------------------------



const user_login = async (req, res, next) => {

    const { value, error } = userLoginValidationSchema.validate(req.body);
    if (error) {
        return next(new CustomError(error.message));
    }


    const { email, password } = value;


    const user = await User.findOne({ email });
    if (!user) {
        return next(new CustomError("User not found", 400));
    }


    const matching = await bcrypt.compare(password, user.password);
    if (!matching) {
        return next(new CustomError("Password is not matching"));
    }


    if (user.isVerified !== true) {
        return next(new CustomError("User is not verified", 400));
    }


    const token = jwt.sign(
        { id: user._id, username: user.name, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "1m" }
    );

    const refreshmentToken = jwt.sign(
        { id: user._id, username: user.name, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "7d" }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 60 * 1000, // 1 minute
        sameSite: 'none'
    });

    res.cookie("refreshmentToken", refreshmentToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });



    return res.status(200).json({
        errorCode: 0,
        status: true,
        msg: 'User login successfully',
        data: {
            user: { id: user._id, name: user.name, email: user.email },
            token: token,
            refreshmentToken: refreshmentToken
        },
    });
};



//get song
// ---------------------------------------------------------------------------------------------------------

const get_allsongs = async (req, res, next) => {
    try {
        const songs = await Song.find();

        if (!songs || songs.length === 0) {
            return next(new CustomError("Songs not found", 400));
        }


        const formattedSongs = songs.map(song => {
            const minutes = Math.floor(song.duration / 60);
            const seconds = song.duration % 60; // Get seconds
            const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            return {
                ...song.toObject(),
                duration: formattedDuration
            };
        });

        res.status(200).json(formattedSongs);
    } catch (error) {
        next(error); // Handle any errors
    }
}



//get songs by id
// ---------------------------------------------------------------------------------------------------------

const getSongs_byId = async (req, res, next) => {
    const { id } = req.params
    const song = await Song.findById(id)
    if (!song) {
        return next(new CustomError('this song not found', 400))
    }

    res.status(200).json(song)

}


//create play list
// ---------------------------------------------------------------------------------------------------------



const create_playlist = async (req, res, next) => {
    console.log(req.user);

    const { playlistName, songsId } = req.body;
    console.log("name:", playlistName, songsId);

    const findplaylist = await Playlist.findOne({ user: req.user.id, name: playlistName });

    if (findplaylist) {

        const songInPlaylist = findplaylist.songs.find((song) => song.toString() === songsId);

        if (songInPlaylist) {
            return next(new CustomError('This song is already in the playlist', 400));
        } else {

            findplaylist.songs.push(songsId);
            await findplaylist.save();

            return res.status(200).json(findplaylist);
        }
    } else {

        const playlist = new Playlist({
            user: req.user.id,
            name: playlistName,
            songs: [songsId]
        });

        await playlist.save();

        return res.status(201).json(playlist);
    }

};


//get playlist
// ---------------------------------------------------------------------------------------------------------

const get_playlist = async (req, res, next) => {

    const id = req.user.id
    const playlist = await Playlist.find({ user: id }).populate('songs')
    if (!playlist) {
        return next(new CustomError('playlist not found', 400))
    }
    res.status(200).json(playlist)


}

//get playlist
// ---------------------------------------------------------------------------------------------------------
const getAll_playlist = async (req, res, next) => {
    try {
        const playlists = await Playlist.find().populate('songs');

        if (!playlists) {
            return next(new CustomError('Playlist not found', 400));
        }


        const formattedPlaylists = playlists.map((playlist) => ({
            ...playlist.toObject(),
            songs: playlist.songs.map((song) => ({
                ...song.toObject(),
                duration: formatDuration(song.duration),
            })),
        }));

        res.status(200).json({ playlists: formattedPlaylists });
    } catch (error) {
        next(error);
    }
};


const formatDuration = (seconds) => {

    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [mins, secs]
        .map((val) => val.toString().padStart(2, '0'))
        .join(':');
};


//delete playlist
// ---------------------------------------------------------------------------------------------------------

const deletesongfrom_playlist = async (req, res, next) => {
    const id = req.user.id;
    const { playlistid, songId } = req.body;

    console.log("Deleting song from playlist:", playlistid, songId);

    const playlist = await Playlist.findOne({ user: id, _id: playlistid }).populate('songs');

    if (!playlist) {
        return next(new CustomError("Playlist not found", 404));
    }


    const songIndex = playlist.songs.findIndex(song => song._id.equals(songId)); // Use .equals() for ObjectId comparison

    if (songIndex === -1) {
        return next(new CustomError("Song not found in playlist", 404));
    }
    playlist.songs.splice(songIndex, 1);
    await playlist.save();

    res.status(200).json(playlist);
};


const delete_playlist = async (req, res) => {

    const { id } = req.params
    await Playlist.findByIdAndDelete(id)
    res.status(200).json("playlist deleted successfully")

}


//add to liked song
// ---------------------------------------------------------------------------------------------------------

const addto_likedsong = async (req, res, next) => {

    const id = req.user.id
    const { songId } = req.body

    const user = await User.findById(id)
    if (user) {
        const songinfavorite = user.likedSongs.find((song) => song == songId)
        if (songinfavorite) {
            return next(new CustomError("this song allready added to favourite"))
        } else {
            user.likedSongs.push(songId)
            await user.save()
            res.status(200).json(user)
        }
    } else {

        const newlikedsong = new User({
            likedSongs: [songId]
        })
        await newlikedsong.save()


        res.status(200).json(newlikedsong)

    }


}



//get liked songs
// ---------------------------------------------------------------------------------------------------------

const get_favourite = async (req, res, next) => {
    const id = req.user.id;


    const user = await User.findById(id).populate('likedSongs');
    if (!user) {
        return next(new CustomError("Liked songs not found", 404));
    }


    const formattedSongs = user.likedSongs.map(song => ({
        ...song._doc,
        duration: formatDurationToTime(song.duration),
    }));

    res.status(200).json(formattedSongs);
};


const formatDurationToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};


//delete song from favourite
// ---------------------------------------------------------------------------------------------------------


const deletesongfrom_favourite = async (req, res) => {
    const id = req.user.id
    const { songId } = req.body
    const data = await User.findById(id)
    if (!data) {
        return next(new CustomError("songs not found"))
    }
    data.likedSongs = data.likedSongs.filter((song) => song != songId)
    console.log(data.likedSongs);
    await data.save()
    res.status(200).json("song deleted successfully")


}


const userlog_out = async (req, res, next) => {

    res.clearCookie("token")
    res.clearCookie("refreshmentToken")
    res.status(200).json("successfully logout")

}


const getalbums = async (req, res, next) => {
    // Aggregate songs by album
    const songs = await Song.aggregate([
        {
            $group: {
                _id: "$album",
                songs: { $push: "$$ROOT" }
            }
        }
    ]);

    if (!songs || songs.length === 0) {
        return next(new CustomError("Albums not found", 400));
    }

    // Format the response with converted duration
    const formattedOutput = songs.map(album => ({
        _id: album._id,
        songs: album.songs.map(song => ({
            ...song,
            duration: formatSongDuration(song.duration) // Format duration as mm:ss
        }))
    }));

    res.status(200).json(formattedOutput);
};

// Helper function to format duration
const formatSongDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`; // Format as mm:ss
};



const artist = async (req, res, next) => {

    const songs = await Song.aggregate([
        {
            $group: {
                _id: "$artist",
                songs: { $push: "$$ROOT" }
            }
        }
    ]);

    if (!songs || songs.length === 0) {
        return next(new CustomError("Artist not found", 400));
    }


    const formattedOutput = songs.map(item => ({
        artist: item._id,
        songs: item.songs.map(song => ({
            ...song,
            duration: convertDuration(song.duration)
        }))
    }));

    res.status(200).json(formattedOutput);
};


const convertDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};



module.exports = {
    user_registration,
    verify_otp,
    user_login,
    get_allsongs,
    getSongs_byId,
    create_playlist,
    get_playlist,
    deletesongfrom_playlist,
    delete_playlist,
    addto_likedsong,
    get_favourite,
    deletesongfrom_favourite,
    userlog_out,
    getAll_playlist,
    getalbums,
    artist

}