import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaEllipsisH, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addtofavourite, deletefromfavourite, getfavourite } from "../../../redux/slices/favouriteSlice";
import { createplaylist, getuserplaylist, deletefromplaylist } from "../../../redux/slices/userplaylistSlice";
import { getplaylist } from "../../../redux/slices/playlistSlice";
import { toast } from "react-toastify";
import Marquee from "react-fast-marquee";
import { setCurrentsong } from "../../../redux/slices/songSlice";

const MusicCard = ({ album, songs, image, gradient }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [playlistDropdownIndex, setPlaylistDropdownIndex] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [input, setInput] = useState(false);
  const [name, setName] = useState('');
  const audioRef = useRef(new Audio(songs[0].audioSrc));
  const userplaylist = useSelector((state) => state.userplaylist.userplaylist);
  const favourite = useSelector((state) => state.favourite.favourite);
  const currentuser = localStorage.getItem("current user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userplaylists } = useParams();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    dispatch(getfavourite());
  }, [dispatch]);

  useEffect(() => {
    const liked = songs.filter((song) => favourite.some((fav) => fav._id === song.id));
    setLikedSongs(liked);
  }, [favourite, songs]);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlayPause = async (index) => {
    if (currentSongIndex === index) {
      isPlaying ? audioRef.current.pause() : await audioRef.current.play();
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

  const toggleDropdown = (index) => {
    if (currentuser) {
      setDropdownIndex(dropdownIndex === index ? null : index);
    } else {
      toast.error("Please login");
    }
  };

  const togglePlaylistDropdown = (index) => {
    setPlaylistDropdownIndex(playlistDropdownIndex === index ? null : index);
  };

  const addToFavourite = async (songId) => {
    await dispatch(addtofavourite(songId));
    await dispatch(getfavourite());
  };

  const deleteFromFavourite = async (songId) => {
    await dispatch(deletefromfavourite(songId));
    await dispatch(getfavourite());
  };

  const addtoplaylist = async (playlistName, songsId) => {
    await dispatch(createplaylist({ playlistName, songsId }));
    await dispatch(getuserplaylist());
    await dispatch(getplaylist());
  };

  const handlesubmit = async (e, playlistName, songsId) => {
    e.preventDefault();
    await dispatch(createplaylist({ playlistName, songsId }));
    await dispatch(getuserplaylist());
    await dispatch(getplaylist());
    setInput(false);
    setName('');
  };

  return (
    <div
      className={`text-white font-sans ${gradient || "bg-gradient-to-br from-gray-900 via-slate-800 to-green-800"} 
      sm:ml-12 w-fit p-6 shadow-lg`}
      style={{ minHeight: "70vh", maxHeight: "85vh", overflowY: "auto" }}
    >
      {/* Album section with heading aligned right */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
        <img
          src={songs[0]?.image || image?.props}
          alt={album.name}
          className="w-40 h-40 rounded-lg object-cover shadow-md"
        />
        <div className="sm:text-right text-center sm:ml-8 w-full">
          <h1 className="text-4xl font-bold tracking-tight">{album.name}</h1>
          <p className="text-lg text-gray-200 mt-1">{songs[0]?.artist}</p>
        </div>
      </div>

      {/* Song table */}
      <table className="w-full table-fixed text-gray-200">
        <thead>
          <tr>
            <th className="w-10 py-3 text-left">#</th>
            <th className="py-3 text-left">Title</th>
            <th className="py-3 text-center">⏱</th>
            <th className="py-3 text-center w-10"></th>
            <th className="py-3 text-center w-16">Play</th>
            <th className="py-3 text-center w-10">...</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              className="hover:bg-white hover:bg-opacity-10 hover:text-orange-400 transition-all duration-200"
            >
              <td className="py-2">{index + 1}</td>

              <Link to={`/playcomponent/${album.id}`} onClick={() => dispatch(setCurrentsong(song.id))}>
                <td className={`max-w-20 sm:max-w-full overflow-hidden py-2 ${currentSongIndex === index && isPlaying ? "text-green-500 font-semibold" : ""}`}>
                  {isSmallScreen ? <Marquee speed={25}>{song.title}</Marquee> : song.title}
                </td>
              </Link>

              <td className="py-2 text-center z-30">{song.duration}</td>

              <td className="py-2 text-center">
                <button
                  onClick={() =>
                    favourite.some((fav) => fav._id === song.id)
                      ? deleteFromFavourite(song.id)
                      : addToFavourite(song.id)
                  }
                  className={`transition duration-200 ${favourite.some((fav) => fav._id === song.id)
                    ? "text-green-500 hover:text-green-700"
                    : "text-gray-300 hover:text-white"
                  }`}
                >
                  <FaHeart />
                </button>
              </td>

              <td className="py-2 text-center">
                <button
                  onClick={() => {
                    if (currentuser) {
                      handlePlayPause(index);
                    } else {
                      toast.error("Please login");
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

              <td className="py-2 text-center relative">
                <button
                  className="text-gray-300 hover:text-white transition duration-200"
                  onClick={() => toggleDropdown(index)}
                >
                  <FaEllipsisH />
                </button>
                {dropdownIndex === index && currentuser && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-black text-white text-sm rounded-md shadow-lg z-50">
                    <button
                      className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                      onClick={() => togglePlaylistDropdown(index)}
                    >
                      Add to playlist
                    </button>
                    {playlistDropdownIndex === index && (
                      <div className="absolute top-12 right-0 mt-2 w-40 bg-black text-white text-sm rounded-md shadow-lg overflow-y-auto max-h-48 z-50">
                        {input ? (
                          <form className="flex flex-col p-2 gap-2" onSubmit={(e) => handlesubmit(e, name, song.id)}>
                            <input
                              type="text"
                              placeholder="New Playlist"
                              className="bg-gray-800 text-white rounded-md p-2 text-sm"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                            <button
                              type="submit"
                              className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                            >
                              Create
                            </button>
                          </form>
                        ) : (
                          <button
                            onClick={() => setInput(true)}
                            className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                          >
                            Create New Playlist
                          </button>
                        )}
                        {userplaylist.map((playlist) => (
                          <button
                            key={playlist._id}
                            onClick={() => addtoplaylist(playlist.name, song.id)}
                            className="block px-4 py-2 hover:bg-gray-700 rounded-md"
                          >
                            {playlist.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MusicCard;
