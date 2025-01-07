import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../Layout/Navbar/Navbar';
import Sidebar from '../Layout/Sidebar';
import { addtofavourite, deletefromfavourite, getfavourite } from '../../../redux/slices/favouriteSlice';

const MusicController = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { id1, id2 } = useParams();
  const [songs, setSongs] = useState([]);
  const audioPlayerRef = useRef(null); // Ref for the audio player
  const dispatch = useDispatch();

  const artist = useSelector((state) => state.artist.artist);
  const albums = useSelector((state) => state.albums.albums);
  const Playlist = useSelector((state) => state.playlist.playlist);
  const favourite = useSelector((state) => state.favourite.favourite);
  const allsongs=useSelector((state)=>state.song.songs)
  useEffect(() => {
    const filteredArtist = artist?.find((item) => item.artist === id2);
    const filteredAlbums = albums?.find((alb) => alb._id === id2);
    const filteredPlaylist = Playlist.playlists.find((item) => item._id === id2);
    
    
    console.log('sd:',allsongs);
    const songsForPlay =
      (filteredPlaylist && filteredPlaylist.songs) ||
      (filteredArtist && filteredArtist.songs) ||
      (filteredAlbums && filteredAlbums.songs) ||
      (favourite && favourite.length > 0 ? favourite : []) ||
      [];
    setSongs(songsForPlay);
  }, [artist, albums, Playlist, favourite, id2]);

  useEffect(() => {
    const songIndex = songs.findIndex((song) => song._id === id1);
    if (songIndex >= 0) {
      setCurrentSongIndex(songIndex);
      setIsPlaying(true); // Set to play when song is selected
    }
  }, [id1, songs]);

  useEffect(() => {
    if (isPlaying && audioPlayerRef.current) {
      audioPlayerRef.current.audioEl.current.play(); // Explicitly play the audio
    }
  }, [currentSongIndex, isPlaying]);

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  const handleSongEnd = () => {
    handleNext();
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.audioEl.current.pause();
      } else {
        audioPlayerRef.current.audioEl.current.play();
      }
    }
  };

  const liked =
    songs[currentSongIndex] &&
    favourite.some((song) => song._id === songs[currentSongIndex]._id);

  const addTofavourite = async (songId) => {
    await dispatch(addtofavourite(songId));
    await dispatch(getfavourite());
  };

  const removefromfavourite = async (songId) => {
    await dispatch(deletefromfavourite(songId));
    await dispatch(getfavourite());
  };

  return (
    <div className="w-screen fixed h-screen bg-black flex flex-col">
    <div className='hidden sm:block'>
      <Navbar />
      </div>
      <div className="flex flex-grow ">
        <div className='hidden sm:block'>
        <Sidebar />
        </div>
        <div className="flex-grow flex justify-center items-center mt-[20px] w-96 bg-black">
          <Card
            sx={{
              backgroundColor: '#000',
              borderRadius: '8px',
              boxShadow: 3,
              width: '700px',
              height: '900px',
              color: '#fff',
            }}
            className="bg-[#121212] rounded-lg shadow-lg"
          >
            <CardContent className="flex flex-col items-center">
              {songs.length > 0 && songs[currentSongIndex] ? (
                <>
                  <img
                    src={songs[currentSongIndex].image}
                    alt={songs[currentSongIndex].title}
                    className="w-[700px] h-[320px] rounded-lg object-cover mb-4"
                  />
                  <Typography variant="h5" component="div" className="mt-2 text-white">
                    {songs[currentSongIndex].title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    {songs[currentSongIndex].artist}
                  </Typography>

                  <ReactAudioPlayer
                    ref={audioPlayerRef}
                    src={songs[currentSongIndex].fileUrl}
                    autoPlay={isPlaying}
                    controls
                    className="w-full mt-2 bg-black"
                    onEnded={handleSongEnd}
                  />

                  <div className="flex justify-center mt-2">
                    <IconButton
                      sx={{ color: 'white' }}
                      onClick={handlePrevious}
                      className="text-white"
                    >
                      <SkipPreviousIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: 'white' }}
                      onClick={togglePlayPause}
                      className="text-white"
                    >
                      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                    <IconButton
                      sx={{ color: 'white' }}
                      onClick={handleNext}
                      className="text-white"
                    >
                      <SkipNextIcon />
                    </IconButton>

                    <IconButton
                      sx={{ color: liked ? 'green' : 'white' }}
                      onClick={async () => {
                        if (liked) {
                          await removefromfavourite(songs[currentSongIndex]._id);
                        } else {
                          await addTofavourite(songs[currentSongIndex]._id);
                        }
                      }}
                      className="text-white"
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </div>
                </>
              ) : (
                <Typography variant="body2" className="text-gray-400">
                  No songs available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicController;
