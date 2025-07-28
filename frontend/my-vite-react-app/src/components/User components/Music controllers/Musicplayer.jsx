

import { useEffect, useRef, useState } from 'react';
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
import Smnavbar from '../Layout/Navbar/Smnavbar';
import {
  addtofavourite,
  deletefromfavourite,
  getfavourite,
} from '../../../redux/slices/favouriteSlice';
import {
  setPlaying,
  setVolume,
} from '../../../redux/slices/songSlice';

const MusicController = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([]);
  const audioPlayerRef = useRef(null);
  const dispatch = useDispatch();
  const { id2 } = useParams();

  const artist = useSelector((state) => state.artist.artist);
  const albums = useSelector((state) => state.albums.albums);
  const Playlist = useSelector((state) => state.playlist.playlist);
  const favourite = useSelector((state) => state.favourite.favourite);
  const allsongs = useSelector((state) => state.song.songs);
  const id1 = useSelector((state) => state.song.currentSong);
  const isPlaying = useSelector((state) => state.song.isPlaying);
  const volume = useSelector((state) => state.song.volume);

  useEffect(() => {
    const filteredArtist = artist?.find((item) => item.artist === id2);
    const filteredAlbums = albums?.find((alb) => alb._id === id2);
    const filteredPlaylist = Playlist.playlists.find((item) => item._id === id2);
    const filteredsong = [];
    filteredsong.push(allsongs.find((song) => song._id == id1));

    const songsForPlay =
      (filteredPlaylist && filteredPlaylist.songs) ||
      (filteredArtist && filteredArtist.songs) ||
      (filteredAlbums && filteredAlbums.songs) ||
      (filteredsong && filteredsong) ||
      (favourite && favourite.length > 0 ? favourite : []) ||
      [];

    setSongs(songsForPlay);
  }, [artist, albums, Playlist, favourite, id2]);

  useEffect(() => {
    const songIndex = songs.findIndex((song) => song._id === id1);
    if (songIndex >= 0) {
      setCurrentSongIndex(songIndex);
      dispatch(setPlaying(true));
    }
  }, [id1, songs, dispatch]);

  useEffect(() => {
    const audio = audioPlayerRef.current?.audioEl?.current;
    if (!audio) return;

    audio.volume = volume;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, currentSongIndex, volume]);

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    dispatch(setPlaying(true));
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    dispatch(setPlaying(true));
  };

  const togglePlayPause = () => {
    dispatch(setPlaying(!isPlaying));
  };

  const handleSongEnd = () => {
    handleNext();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    const audio = audioPlayerRef.current?.audioEl?.current;
    if (audio) audio.volume = newVolume;
  };

  const liked =
    songs[currentSongIndex] &&
    favourite.some((song) => song._id === songs[currentSongIndex]._id);

  const toggleFavourite = async (songId) => {
    if (liked) {
      await dispatch(deletefromfavourite(songId));
    } else {
      await dispatch(addtofavourite(songId));
    }
    await dispatch(getfavourite());
  };

  return (
    <div className="w-screen fixed h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <div className="hidden sm:block">
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
            className="flex bg-[#121212] rounded-lg shadow-lg"
          >
            <CardContent className="flex flex-col items-center justify-center sm:justify-normal">
              {songs.length > 0 && songs[currentSongIndex] ? (
                <>
                  <img
                    src={songs[currentSongIndex].image}
                    alt={songs[currentSongIndex].title}
                    className="w-[700px] h-[320px] rounded-lg object-cover mb-4"
                  />
                  <Typography variant="h5" className="mt-2 text-white">
                    {songs[currentSongIndex].title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    {songs[currentSongIndex].artist}
                  </Typography>

                  <ReactAudioPlayer
                    ref={audioPlayerRef}
                    src={songs[currentSongIndex].fileUrl}
                    autoPlay
                    controls
                    className="w-full mt-2 bg-black"
                    onEnded={handleSongEnd}
                  />

                  <div className="flex justify-center mt-2">
                    <IconButton sx={{ color: 'white' }} onClick={handlePrevious}>
                      <SkipPreviousIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white' }} onClick={togglePlayPause}>
                      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                    <IconButton sx={{ color: 'white' }} onClick={handleNext}>
                      <SkipNextIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: liked ? 'green' : 'white' }}
                      onClick={() => toggleFavourite(songs[currentSongIndex]._id)}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </div>

                  <div className="flex items-center mt-4 gap-2 w-full px-4">
                    <Typography variant="body2" className="text-gray-300">
                      Volume
                    </Typography>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full"
                    />
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
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Smnavbar />
      </div>
    </div>
  );
};

export default MusicController;
