import { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MusicCard = ({ album, songs, image, gradient }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(new Audio(songs[0].audioSrc));
  const albums = useSelector((state) => state.albums.albums);
  const currentuser = localStorage.getItem("current user");
  const navigate = useNavigate();

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

  const albumFilter = albums.filter((alb) => alb._id === album.id);
  const albumId = albumFilter.map((alb) => alb._id);
  
console.log("liked song:",album);
  return (
    <div
      className={`w-full mx-auto p-6 shadow-lg text-white font-sans h-screen ${
        gradient || "bg-gradient-to-b from-orange-500 to-black"
      }`}
    >
      {/* Album headers */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <img
          src={songs[0]?.image || image?.props}
          alt={album.name}
          className="w-40 h-36 rounded-lg object-cover shadow-md"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight">{album.name}</h1>
          <p className="text-lg text-gray-200 mt-1">{songs[0]?.artist}</p>
        </div>
      </div>

      <table className="w-full table-fixed text-gray-200">
        <thead>
          <tr>
            <th className="w-10 py-3 text-left">#</th>
            <th className="py-3 text-left">Title</th>
            <th className="py-3 text-center">⏱</th>
            <th className="py-3 text-center w-16">Play</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={index}
              className="hover:bg-white hover:bg-opacity-10 hover:text-orange-400 transition-all duration-200"
            >
              <td className="py-2">{index + 1}</td>
              <Link
  to={
    album.id === album.artist
      ? `/artist/playcomponent/${song.id}/${album.artist}`
      : album.id === "albumId" 
      ? `/albums/playcomponent/${song._id}/${albumId}`
      : album.name === 'Likedsongs'
      ? `/likedsongs/playcomponent/${song.id}/${album.id}` // Send only song.id
      : `/playcomponent/${song.id}/${album.id}` // Default case
  }
>
                <td
                  className={`py-2 ${
                    currentSongIndex === index && isPlaying
                      ? "text-green-500 font-semibold"
                      : ""
                  }`}
                >
                  {song.title}
                </td>
              </Link>
              <td className="py-2 text-center">{song.duration}</td>
              <td className="py-2 text-center">
                <button
                  onClick={() => {
                    if (currentuser) {
                      handlePlayPause(index);
                    } else {
                      alert("Please login");
                      navigate("/login");
                    }
                  }}
                  className="w-16 h-8 flex items-center justify-center rounded-full transition-all duration-200"
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

export default MusicCard;
