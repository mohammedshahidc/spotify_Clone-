import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar/Navbar';
import axiosInstance from '../../../../axiosinstance';
import { addtofavourite, getfavourite,deletefromfavourite } from '../../../redux/slices/favouriteSlice';


const MusicController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const audioRef = useRef(new Audio()); // Initialize audio object

  const albums = useSelector((state) => state.albums.albums);
  const Playlist = useSelector((state) => state.playlist.playlist);
  const artist = useSelector((state) => state.artist.artist);
  const favourite = useSelector((state) => state.favourite.favourite);

  const { id1, id2 } = useParams();

  const filteredartist = artist.find((item) => item.artist === id2);
  const filteredalbums = albums.find((alb) => alb._id === id2);
  const filteredPlaylist = Playlist.playlists.find((item) => item._id === id2);
  const dispatch = useDispatch();

  const songs =
    (filteredPlaylist && filteredPlaylist.songs) ||
    (filteredartist && filteredartist.songs) ||
    (filteredalbums && filteredalbums.songs) ||
    (favourite && favourite.length > 0 ? favourite : []) ||
    [];

  useEffect(() => {
    if (songs.length > 0) {
      const filteredSongs = songs.filter((song) => song._id === id1);
      if (filteredSongs.length > 0) {
        setCurrentTrack(filteredSongs[0]);
        setCurrentSongIndex(songs.indexOf(filteredSongs[0]));
      }
    }
  }, [songs, id1, id2]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleSkipNext();
    };

    if (currentTrack) {
      if (audio.src !== currentTrack.fileUrl) {
        audio.src = currentTrack.fileUrl;
      }

      if (isPlaying) {
        audio.play().catch((error) => console.error('Error playing audio:', error));
      } else {
        audio.pause();
      }
    }

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleSkipNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentTrack(songs[nextIndex]);
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const handleSkipPrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentTrack(songs[prevIndex]);
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleSeek = (event, newValue) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  console.log("curtrack:", currentTrack);
  const liked = currentTrack && favourite.some((song) => song._id === currentTrack._id);

  console.log("liked:", liked);

  const addToFavourite = async(songId) => {
   await dispatch(addtofavourite(songId))
   await dispatch(getfavourite())
  };
  
  const deletefromFavourite =async (songId) => {
   await dispatch(deletefromfavourite(songId))
   await dispatch(getfavourite())
  };

  return (
    <div className="fixed w-screen bg-black">
      <Navbar />
      <div className="bg-black flex">
        <Sidebar />
        <div>
          <Card
            sx={{
              maxWidth: 1000,
              margin: 'auto',
              padding: 2,
              backgroundColor: 'black',
              color: 'white',
              height: 900,
            }}
          >
            <CardContent>
              <img src={currentTrack?.image} alt="Track Cover" className="h-60 w-screen" />
              <Typography variant="h5" component="div" color="white">
                Now Playing
              </Typography>
              {currentTrack ? (
                <Typography variant="body2" color="white">
                  {currentTrack.title} - {currentTrack.artist} (Song {currentSongIndex + 1} of{' '}
                  {songs.length})
                </Typography>
              ) : (
                <Typography variant="body2" color="white">
                  No track playing
                </Typography>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  marginTop: '20px',
                }}
              >
                <IconButton
                  onClick={handleSkipPrevious}
                  disabled={currentSongIndex <= 0}
                  sx={{ color: 'white' }}
                >
                  <SkipPreviousIcon fontSize="large" />
                </IconButton>

                <IconButton onClick={isPlaying ? handlePause : handlePlay} sx={{ color: 'white' }}>
                  {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
                </IconButton>

                <IconButton
                  onClick={handleSkipNext}
                  disabled={currentSongIndex >= songs.length - 1}
                  sx={{ color: 'white' }}
                >
                  <SkipNextIcon fontSize="large" />
                </IconButton>

                <IconButton
                  sx={{
                    position: 'absolute',
                    right: '20px',
                    color: liked ? "green" : 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                  onClick={() => {
                    liked
                      ? deletefromFavourite(currentTrack?._id)
                      : addToFavourite(currentTrack?._id);
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Slider
                  value={currentTime}
                  min={0}
                  max={duration}
                  onChange={handleSeek}
                  sx={{ color: 'white' }}
                />
              </div>

              <Typography variant="body2" color="white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>

              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography variant="body2" color="white" style={{ marginRight: '10px' }}>
                  Volume
                </Typography>
                <Slider
                  value={volume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handleVolumeChange}
                  sx={{
                    color: 'white',
                    width: '150px',
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicController;
