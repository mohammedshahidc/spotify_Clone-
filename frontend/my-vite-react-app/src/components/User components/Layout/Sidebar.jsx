

import { useEffect, useState } from 'react';
import { FaHome, FaHeart } from 'react-icons/fa';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteplaylist, getuserplaylist } from '../../../redux/slices/userplaylistSlice';
import { getplaylist } from '../../../redux/slices/playlistSlice';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isdropdown, setisdropdown] = useState(null);
  const userplaylist = useSelector((state) => state.userplaylist.userplaylist);
  const navigate = useNavigate();
  const user = localStorage.getItem('current user');

  const handledelete = async (playlistId) => {
    await dispatch(deleteplaylist({ playlistId }));
    await dispatch(getuserplaylist());
    await dispatch(getplaylist());
  };

  const handledropdown = (id) => {
    setisdropdown((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    dispatch(getuserplaylist());
  }, [dispatch]);

  const handleClick = () => {
    toast.error('Please Login');
    navigate('/login');
  };

  return (
    <>
      {user ? (
        <div className="bg-black text-white w-16 sm:w-16 md:w-64 lg:w-72 fixed top-24 bottom-0 left-4 rounded-lg ml-3 flex flex-col overflow-y-auto z-20">
          <div className="flex items-center justify-center md:justify-start py-6 px-4 md:px-6">
            <span className="text-2xl font-bold hidden md:block">Spotify</span>
            <span className="text-2xl font-bold block md:hidden">S</span>
          </div>
          <nav className="flex flex-col mt-4 space-y-6 px-4 md:px-6">
            <Link to="/" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
              <FaHome className="text-xl" />
              <span className="hidden md:block">Home</span>
            </Link>
            <Link to="/likedsongs" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
              <FaHeart className="text-xl" />
              <span className="hidden md:block">Liked Songs</span>
            </Link>
            <div className="relative">
              <ul className="mt-2 rounded-lg shadow-lg overflow-y-auto max-h-96 scrollbar-none w-full">
                {userplaylist.length > 0 ? (
                  userplaylist.map((playlistItem, index) => (
                    <li key={index} className="hover:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between px-4 py-3">
                        <Link
                          to={`/userplaylist/playcomponent/${playlistItem._id}`}
                          className="flex items-center w-full sm:space-x-1 md:space-x-3"
                        >
                          <img
                            src={playlistItem?.songs?.[0]?.image || '/default-image.png'}
                            alt={playlistItem?.name || 'Playlist'}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <span className="text-md text-white font-semibold sm:block">
                            {playlistItem?.name || 'Untitled Playlist'}
                          </span>
                        </Link>
                        <div className="relative">
                          <div
                            className="cursor-pointer text-gray-400 hover:text-white ml-2"
                            onClick={() => handledropdown(playlistItem._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                              />
                            </svg>
                          </div>
                          {isdropdown === playlistItem._id && (
                            <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg">
                              <ul>
                                <li
                                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                  onClick={() => handledelete(playlistItem._id)}
                                >
                                  Delete Playlist
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-400">No playlists available</li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      ) : (
        <div className="bg-black mt-20 border border-solid rounded-md border-slate-700 text-white w-80 max-w-96 h-[500px] flex flex-col fixed top-24 bottom-0 left-4 rounded-lg ml-3">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h1 className="text-lg font-semibold">Your Library</h1>
            <button className="p-1 hover:bg-slate-800 rounded" onClick={handleClick}>
              <Plus size={18} className="text-gray-300" />
            </button>
          </div>
          <div className="flex-1 p-4 space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Create your first playlist</h2>
              <p className="text-gray-400 text-sm">It's easy, we'll help you</p>
              <button
                className="bg-white text-black font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition-colors text-sm"
                onClick={handleClick}
              >
                Create playlist
              </button>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Find some podcasts</h2>
              <p className="text-gray-400 text-sm">We'll keep you updated on episodes</p>
              <button
                className="bg-white text-black font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition-colors text-sm"
                onClick={handleClick}
              >
                Browse podcasts
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-slate-700">
            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Legal</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Safety</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
