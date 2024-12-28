import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserplaylist } from '../../redux/slices/userplaylistSlice';
import { FaPencilAlt } from "react-icons/fa";
const Profile = () => {
    const [input, setinput] = useState(false)
    const [ishover, setishover] = useState(false)
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        if (user) {
            setProfilePicture(JSON.parse(localStorage.getItem('profilepicture')));
        }
    }, [user]);
    useEffect(() => {
        dispatch(getuserplaylist())
    }, [dispatch])
    const playlists = useSelector((state) => state.userplaylist.userplaylist);

    const handleClick = () => {
        setinput(true)
    }
    const handlehover = () => {
        setishover(true)
    }
    const handleunhover = () => {
        setishover(false)
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-8 w-full">
                <div className=" w-24 h-24" onMouseEnter={handlehover} onMouseLeave={handleunhover}>
                    {ishover ? <FaPencilAlt size={16} color="black" className="w-24 h-24 border-4 rounded-full mb-4 object-cover" onClick={handleClick} /> : 
                    <img
                        src={profilePicture || '/default-profile.png'}
                        alt="Profile"
                        className="w-24 h-24 border-solid border-4 border-gray-700 rounded-full mb-4 object-cover"

                    />}

                    <span className="absolute bottom-0 right-0 bg-green-500 border border-gray-800 w-6 h-6 rounded-full"></span>
                </div>
                {input ? (
                    <form  className="flex flex-col items-center">
                        <input
                            type="text"
                            defaultValue={user?.user}
                            className="mb-2 p-2 rounded bg-gray-700 border border-gray-600 text-white"
                            placeholder="Enter new username"
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded">Submit</button>
                    </form>
                ) : (
                    <h1 className="text-3xl font-extrabold">{user?.user?.toUpperCase() || 'Username'}</h1>
                )}
               
                
            </div>

            {/* Playlists Section */}
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">Your Playlists</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playlists && playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <li
                                key={playlist._id}
                                className="flex flex-col bg-gray-800 p-4 rounded-lg hover:bg-gray-700 shadow-md"
                            >
                                <img
                                    src={playlist.songs[0]?.image || '/default-image.png'}
                                    alt={playlist.name}
                                    className="w-full h-32 rounded-lg mb-4 object-cover"
                                />
                                <span className="text-lg font-semibold mb-2">{playlist.name}</span>
                                <button className="mt-auto text-sm font-medium text-gray-300 hover:text-white">
                                    View Playlist
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400 col-span-full text-center">No playlists available</li>
                    )}
                </ul>
            </div>
        </div>

    );
};

export default Profile;
