import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllsongs } from "../../../../redux/slices/songSlice";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(getAllsongs());
  }, [dispatch]);

  const { songs, status } = useSelector((state) => state.song);
  const filteredsongs = songs.filter((song) => {
    const word = search.toLowerCase().trim();
    return (
      song.title.toLowerCase().includes(word) ||
      song.artist.toLowerCase().includes(word) ||
      song.album.toLowerCase().includes(word)
    );
  });

  return (
    <div className="relative w-full max-w-md mx-4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="What do you want to play?"
          onFocus={() => setIsActive(true)}
          onBlur={() => setTimeout(() => setIsActive(false), 200)}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="w-full p-2 bg-gray-800 text-white rounded-l-md focus:outline-none md:p-3"
        />
      </div>

      {isActive && search && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-900 text-white rounded-lg shadow-lg max-h-56 overflow-y-auto z-50">
          {status === "loading" && <p className="p-2">Loading songs...</p>}
          {status === "error" && <p className="p-2 text-red-500">Failed to load songs.</p>}
          {filteredsongs.length > 0 ? (
            <ul>
              {filteredsongs.map((song) => (
                <li
                  key={song._id}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg"
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold">{song.title}</p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                    <p className="text-sm text-gray-500">{song.album}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-2">No songs found for "{search}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
