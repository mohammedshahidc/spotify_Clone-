

import { useState, useRef, useEffect } from 'react';
import {
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Maximize2,
  Volume2,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllsongs, setPlaying, setVolume } from '../../../redux/slices/songSlice';
import { addtofavourite, deletefromfavourite, getfavourite } from '../../../redux/slices/favouriteSlice';

const BottomMusicPlayer = () => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const dispatch = useDispatch();

  const allsongs = useSelector((state) => state.song.songs);
  const currentSongId = useSelector((state) => state.song.currentSong);
  const isPlaying = useSelector((state) => state.song.isPlaying);
  const volume = useSelector((state) => state.song.volume);
  const currentSong = allsongs.find((s) => s._id === currentSongId);

  const audioSrc = currentSong?.fileUrl || '';
  const songTitle = currentSong?.title || 'No song selected';
  const albumArt = currentSong?.image || 'https://via.placeholder.com/80?text=No+Art';

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioSrc && isPlaying) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [audioSrc, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleEnded = () => {
    if (repeatMode === 2) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(setPlaying(false));
    }
  };

  const togglePlay = () => {
    dispatch(setPlaying(!isPlaying));
  };

  const handleProgressClick = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const width = progressRef.current.offsetWidth;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value) / 100;
    dispatch(setVolume(newVolume));
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

 const {favourite}=useSelector((state)=>state.favourite)
 useEffect(()=>{
  getfavourite()
  getAllsongs()
 },[currentSongId])
console.log("whdbqudh",favourite);
const index = allsongs.findIndex(song => song._id === currentSongId);
const liked =
    allsongs[index] &&
    favourite.some((song) => song._id === allsongs[index]._id);

  const toggleFavourite = async (songId) => {
    if (liked) {
      await dispatch(deletefromfavourite(songId));
      await getfavourite()
    } else {
      await dispatch(addtofavourite(songId));
      await getfavourite()

    }
    await dispatch(getfavourite());
  };

  return (
    <div className="bg-black text-white p-2 md:p-1 lg:p-0.5 rounded-lg shadow-2xl w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
      <audio ref={audioRef} src={audioSrc} />

      {/* Mobile Layout */}
      <div className="md:hidden flex items-center justify-between space-x-3 mb-3">
        <img src={albumArt} alt="Album cover" className="w-12 h-12 rounded bg-gray-700" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-300 truncate">{songTitle}</h3>
          <div className="flex items-center justify-between mt-1">
            <button onClick={togglePlay} className="p-2 rounded-full bg-white text-black">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={() => toggleFavourite(currentSong._id)} className={`p-2 rounded-full ${liked ? 'text-green-500' : 'text-gray-400'}`}>
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button onClick={() => setRepeatMode((prev) => (prev + 1) % 3)} className="text-gray-400">
              <Repeat size={18} />
            </button>
            <button onClick={() => setIsShuffled(!isShuffled)} className="text-gray-400">
              <Shuffle size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Volume2 size={16} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-gray-600 rounded-lg"
            style={{ background: `linear-gradient(to right, #fff ${volume * 100}%, #4b5563 ${volume * 100}%)` }}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between space-x-2 md:space-x-3 lg:space-x-4">
        <div className="flex items-center space-x-3 min-w-0">
          <img src={albumArt} alt="Album cover" className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-700" />
          <h3 className="text-sm font-medium text-gray-300 truncate">{songTitle}</h3>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() =>toggleFavourite(currentSong._id)} className={`p-1.5 md:p-2 rounded-full hover:bg-gray-800 ${liked ? 'text-green-500' : 'text-gray-400'}`}>
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => setIsShuffled(!isShuffled)} className={`p-1.5 md:p-2 rounded-full hover:bg-gray-800 ${isShuffled ? 'text-green-500' : 'text-gray-400'}`}>
            <Shuffle size={20} />
          </button>
          <button className="p-1.5 md:p-2 rounded-full hover:bg-gray-800 text-gray-400">
            <SkipBack size={20} />
          </button>
          <button onClick={togglePlay} className="p-2.5 md:p-3 rounded-full bg-white text-black hover:bg-gray-200">
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button className="p-1.5 md:p-2 rounded-full hover:bg-gray-800 text-gray-400">
            <SkipForward size={20} />
          </button>
          <button onClick={() => setRepeatMode((prev) => (prev + 1) % 3)} className="p-1.5 md:p-2 rounded-full hover:bg-gray-800 text-gray-400">
            <Repeat size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <Volume2 size={18} className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            className="w-16 md:w-20 h-1 bg-gray-600 rounded-lg"
            style={{ background: `linear-gradient(to right, #fff ${volume * 100}%, #4b5563 ${volume * 100}%)` }}
          />
          <button className="p-1.5 md:p-2 rounded-full hover:bg-gray-800 text-gray-400">
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 flex items-center space-x-1 md:space-x-2 text-xs">
        <span className="text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
        <div ref={progressRef} onClick={handleProgressClick} className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group">
          <div className="h-full bg-white rounded-full" style={{ width: `${progressPercentage}%` }}>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
        <span className="text-gray-400 w-10">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default BottomMusicPlayer;
