import React, { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; 

const AlbumCard = ({ album, songs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(new Audio(songs[0].audioSrc)); 

  
  const handlePlayPause = async (index) => {
    if (currentSongIndex === index) {
     
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
     
      audioRef.current.pause(); 
      audioRef.current.src = songs[index].audioSrc; 
      setCurrentSongIndex(index);
      setIsPlaying(true);

      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-500 to-black w-full mx-auto p-6 shadow-lg text-white font-sans">
      {/* Album Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <img
          src={songs[0].image}
          alt={album.name}
          className="w-32 h-32 rounded-lg object-cover shadow-md"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight">{album.name}</h1>
          <p className="text-lg text-gray-200 mt-1">{songs[0].artist}</p>
        </div>
      </div>

      {/* Song List */}
      <table className="w-full text-left text-gray-200">
        <thead>
          <tr>
            <th className="w-10">#</th>
            <th>Title</th>
            <th className="text-right">⏱</th>
            <th className="text-right" colSpan="2">Play</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={index}
              className="hover:bg-white hover:bg-opacity-10 hover:text-orange-400 transition-all duration-200"
            >
              <td className="py-2">{index + 1}</td>
              <td
                className={
                  currentSongIndex === index && isPlaying
                    ? "text-green-500 font-semibold"
                    : ""
                }
              >
                {song.title}
              </td>
              <td className="text-right">{song.duration}</td>
              <td className="text-right">
                <button
                  onClick={() => handlePlayPause(index)}
                  className="text-black font-bold py-1 px-2 rounded-full flex items-center justify-center"
                >
                  {currentSongIndex === index && isPlaying ? (
                    <FaPause className="text-white" />
                  ) : (
                    <FaPlay className="text-white" />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumCard;
