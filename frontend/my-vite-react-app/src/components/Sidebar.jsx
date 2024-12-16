import React, { useEffect, useState } from 'react';
import { FaHome, FaHeart, FaListUl, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getplaylist } from '../redux/slices/playlistSlice';

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const playlist = useSelector((state) => state.playlist?.playlist || []);
    const playlist1 = playlist[0]?.playlist || []; 

    console.log("Playlist Data:", playlist1);

    useEffect(() => {
        dispatch(getplaylist());
    }, [dispatch]); 

    return (
        <div className="bg-gray-900 text-white h-screen w-64 sm:w-20 md:w-64 flex flex-col transition-all duration-300">
           
            <div className="flex items-center justify-center md:justify-start py-6 px-4 md:px-6">
                <span className="text-2xl font-bold hidden md:block">Spotify</span>
                <span className="text-2xl font-bold block md:hidden">S</span>
            </div>

            
            <nav className="flex flex-col mt-4 space-y-6 px-4 md:px-6">
                <Link to="/" className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
                    <FaHome className="text-xl" />
                    <span className="hidden md:block">Home</span>
                </Link>
                <Link to={"/likedsongs"} className="flex items-center space-x-4 p-2 hover:bg-gray-800 rounded-lg">
                    <FaHeart className="text-xl" />
                    <span className="hidden md:block">Liked Songs</span>
                </Link>

              
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-between w-full space-x-4 p-2 hover:bg-gray-800 rounded-lg focus:outline-none"
                    >
                        <div className="flex items-center space-x-4">
                            <FaListUl className="text-xl" />
                            <span className="hidden md:block">Playlists</span>
                        </div>
                        <div>{isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}</div>
                    </button>

                  
                    {isDropdownOpen && (
                        <ul className="absolute left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-lg">
                            {playlist1.length > 0 ? (
                                playlist1.map((playlistItem, index) => (
                                    <li key={index} className="hover:bg-gray-700 rounded-lg">
                                        <Link
                                            to={`/playlist/playlcomponent/${playlistItem._id}`}
                                            className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 rounded-lg"
                                        >
                                            
                                            <img
                                                src={playlistItem?.songs?.[0]?.image || '/default-image.png'}
                                                alt={playlistItem?.name || 'Playlist'}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />

                                           
                                            <span className="text-sm">{playlistItem?.name || 'Untitled Playlist'}</span>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-sm text-gray-400">No playlists available</li>
                            )}
                        </ul>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;