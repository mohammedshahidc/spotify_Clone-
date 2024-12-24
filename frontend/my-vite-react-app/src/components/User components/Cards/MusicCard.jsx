import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaEllipsisH, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addtofavourite, deletefromfavourite, getfavourite } from "../../../redux/slices/favouriteSlice";

const MusicCard = ({ album, songs, image, gradient }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const audioRef = useRef(new Audio(songs[0].audioSrc));

  const albums = useSelector((state) => state.albums.albums);
  const favourite = useSelector((state) => state.favourite.favourite);
  const currentuser = localStorage.getItem("current user");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getfavourite());
  }, [dispatch]);

  useEffect(() => {
    const liked = songs.filter((song) => favourite.some((fav) => fav._id === song.id));
    setLikedSongs(liked);
  }, [favourite, songs]);

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

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const addToFavourite = async (songId) => {
    await dispatch(addtofavourite(songId));
    await dispatch(getfavourite());
  };

  const deleteFromFavourite = async (songId) => {
    await dispatch(deletefromfavourite(songId));
    await dispatch(getfavourite());
  };

  return (
    <div
      className={`w-full mx-auto p-6 shadow-lg text-white font-sans overflow-y-scroll ${gradient || "bg-gradient-to-b from-orange-500 to-black"}`}
      style={{ height: "calc(100vh - 100px)" }}
    >
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
            <th className="py-3 text-center w-10">❤️</th>
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

              <Link
                to={
                  album.id === album.artist
                    ? `/artist/playcomponent/${song.id}/${album.artist}`
                    : album.id === album._id
                      ? `/albums/playcomponent/${song._id}/${album.id}`
                      : `/playcomponent/${song.id}/${album.id}`
                }
              >
                <td
                  className={`py-2 ${currentSongIndex === index && isPlaying
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

              <td className="py-2 text-center relative">
                <button
                  className="text-gray-300 hover:text-white transition duration-200"
                  onClick={() => toggleDropdown(index)}
                >
                  <FaEllipsisH />
                </button>
                {dropdownIndex === index && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                    <button className="block px-4 py-2 hover:bg-gray-700 rounded-md">
                      Add to playlist
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md" onClick={() =>
                      favourite.some((fav) => fav._id === song.id)
                        ? deleteFromFavourite(song.id)
                        : addToFavourite(song.id)
                    }>
                      Save to your Liked Songs
                    </button>
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