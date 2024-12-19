import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, IconButton, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar/Navbar';
import { FaHeart } from 'react-icons/fa';

const MusicController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audio = useRef(new Audio()).current;

  const Playlist = useSelector((state) => state.playlist.playlist);
  const { id1, id2 } = useParams();

  const filteredPlaylist = Playlist.playlists.find((item) => item._id === id2);
  const songs = filteredPlaylist ? filteredPlaylist.songs : [];

  useEffect(() => {
    if (songs.length > 0) {
      const filteredSongs = songs.filter((song) => song._id === id1);
      if (filteredSongs.length > 0) {
        setCurrentTrack(filteredSongs[0]);
        setCurrentSongIndex(songs.indexOf(filteredSongs[0]));
      }
    }
  }, [songs, id1]);

  const handleEnded = () => {
    handleSkipNext();
  };

  useEffect(() => {
    if (currentTrack) {
      audio.src = currentTrack.fileUrl;

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      });

      if (isPlaying) {
        audio.play().catch((error) => console.error('Error playing audio:', error));
      } else {
        audio.pause();
      }
    }

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      });
    };
  }, [currentTrack, isPlaying, audio]);

  const handlePlay = () => {
    if (audio.src) {
      audio.play().catch((error) => console.error('Error playing audio:', error));
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    audio.pause();
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
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className='fixed w-screen bg-black'>
      <Navbar />
      <div className='bg-black flex'>
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
              <img src={currentTrack?.image} alt="Track Cover" className='h-72 w-screen' />
              <Typography variant="h5" component="div" color="white">
                Now Playing
              </Typography>
              {currentTrack ? (
                <Typography variant="body2" color="white">
                  {currentTrack.title} - {currentTrack.artist} (Song {currentSongIndex + 1} of {songs.length})
                </Typography>
              ) : (
                <Typography variant="body2" color="white">
                  No track playing
                </Typography>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
              </div>

              <div style={{ position: 'relative', marginTop: '20px' }}>
                <Slider
                  value={currentTime}
                  min={0}
                  max={duration}
                  onChange={handleSeek}
                  sx={{ color: 'white' }}
                />
                <FaHeart
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '0',
                    color: 'red',
                    fontSize: '24px',
                    cursor: 'pointer',
                  }}
                />
              </div>

              <Typography variant="body2" color="white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicController;
