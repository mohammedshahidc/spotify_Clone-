import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import axios from 'axios';
import axiosInstance from '../../../../axiosinstance';

const MusicController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audio = useRef(new Audio()).current;
  const [currentSongIndex, setCurrentSongIndex] = useState(-1); // Initialize current song index
  const [totalSongs, setTotalSongs] = useState(0); // Track total songs

  useEffect(() => {
    fetchCurrentTrack();
  }, []);

  useEffect(() => {
    if (currentTrack) {
      audio.src = currentTrack.fileUrl; // Set the audio source to the current track URL
      if (isPlaying) {
        audio.play(); // Play the audio if isPlaying is true
      } else {
        audio.pause(); // Pause the audio if isPlaying is false
      }
    }

    // Cleanup function to stop audio when the component unmounts
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [currentTrack, isPlaying, audio]);

  const fetchCurrentTrack = async () => {
    try {
      const response = await axiosInstance.get('/user/current'); // Fetch current track from backend
      setCurrentTrack(response.data.currentSong);
      setIsPlaying(response.data.isPlaying);
      setCurrentSongIndex(response.data.currentSongIndex); // Set the current song index
      setTotalSongs(response.data.totalSongs || 0); // Set total songs if available
    } catch (error) {
      console.error('Error fetching current track:', error);
    }
  };

  const handlePlay = async () => {
    try {
      await axios.post('/user/play'); // Call backend to play music
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const handlePause = async () => {
    try {
      await axios.post('/user/pause'); // Call backend to pause music
      setIsPlaying(false);
    } catch (error) {
      console.error('Error pausing track:', error);
    }
  };

  const handleSkipNext = async () => {
    try {
      const nextIndex = (currentSongIndex + 1) % totalSongs; // Calculate the next song index
      const response = await axios.post('/user/next'); // Call backend to skip next track
      setCurrentTrack(response.data.currentSong); // Update the current track
      setCurrentSongIndex(nextIndex); // Update current song index
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  const handleSkipPrevious = async () => {
    try {
      const prevIndex = (currentSongIndex - 1 + totalSongs) % totalSongs; // Calculate the previous song index
      const response = await axios.post('/user/previous'); // Call backend to skip previous track
      setCurrentTrack(response.data.currentSong); // Update the current track
      setCurrentSongIndex(prevIndex); // Update current song index
    } catch (error) {
      console.error('Error skipping to previous track:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Now Playing
        </Typography>
        {currentTrack ? (
          <Typography variant="body2" color="text.secondary">
            {currentTrack.title} - {currentTrack.artist} (Song {currentSongIndex + 1} of {totalSongs})
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No track playing
          </Typography>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <IconButton onClick={handleSkipPrevious} disabled={currentSongIndex <= 0}>
            <SkipPreviousIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
          </IconButton>
          <IconButton onClick={handleSkipNext} disabled={currentSongIndex >= totalSongs - 1}>
            <SkipNextIcon fontSize="large" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicController;
