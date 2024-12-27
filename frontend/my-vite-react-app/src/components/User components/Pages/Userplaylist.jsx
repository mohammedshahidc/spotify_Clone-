import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteplaylist, getuserplaylist } from '../../../redux/slices/userplaylistSlice';
import { getplaylist } from '../../../redux/slices/playlistSlice';

const Userplaylist = () => {
    const dispatch = useDispatch();
    const [isdropdown, setisdropdown] = useState(null); // Store index or ID of the active dropdown
    const userplaylist = useSelector((state) => state.userplaylist.userplaylist);

    const handledelete = async (playlistId) => {
        console.log('ddd:',playlistId);
        await dispatch(deleteplaylist({playlistId}));
        await dispatch(getuserplaylist());
        await dispatch(getplaylist());
    };

    const handledropdown = (id) => {
        setisdropdown((prev) => (prev === id ? null : id)); // Toggle dropdown visibility
    };

    return (
        <div>
            <ul className="absolute left-0 mt-2 w-full bg-black rounded-lg shadow-lg overflow-y-scroll scrollbar-none">
                {userplaylist.length > 0 ? (
                    userplaylist.map((playlistItem, index) => (
                        <li key={index} className="hover:bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-between px-4 py-3">
                                <Link to={`/userplaylist/playcomponent/${playlistItem._id}`} className="flex items-center space-x-3 w-full">
                                    <img
                                        src={playlistItem?.songs?.[0]?.image || '/default-image.png'}
                                        alt={playlistItem?.name || 'Playlist'}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <span className="text-md text-white font-semibold">{playlistItem?.name || 'Untitled Playlist'}</span>
                                </Link>
                                {/* Three-dot icon */}
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
                                    {/* Dropdown Menu */}
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
    );
};

export default Userplaylist;
