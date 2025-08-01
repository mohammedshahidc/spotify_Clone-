import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserplaylist } from '../../redux/slices/userplaylistSlice';
import { FaPencilAlt } from "react-icons/fa";
import { edituser } from '../../redux/slices/loginSlice';
import { Link } from 'react-router-dom';
import Navbar from './Layout/Navbar/Navbar';
import Sidebar from './Layout/Sidebar';
import Smnavbar from './Layout/Navbar/Smnavbar';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [name, setName] = useState('');
    const user = useSelector((state) => state.user);
    const playlists = useSelector((state) => state.userplaylist.userplaylist);
    const dispatch = useDispatch();
    const savedProfilePicture = localStorage.getItem('profilepicture');
    console.log('wefh:',user);
    useEffect(() => {
        
        const savedName = localStorage.getItem('current user');

        if (savedProfilePicture) {
            setProfilePicture(savedProfilePicture);
        }
        if (savedName) {
            setName(savedName);
        }
    }, [user]);

    useEffect(() => {
        dispatch(getuserplaylist());
        
    }, [dispatch]);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (name) {
            formData.append("name", name);
        }
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }
        dispatch(edituser(formData));
        setIsEditing(false);
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="flex w-screen h-screen overflow-y-scroll">
                <div className="shadow-lg relative fixed hidden sm:block w-1/5 bg-black text-white ">
                    <Sidebar />
                </div>
                <div className="flex-1 flex flex-col items-center p-6 bg-black text-white min-h-screen overflow-y-scroll scrollbar-none ">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center mb-8 w-full">
                        <div
                            className="relative w-24 h-24"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {isHovering ? (
                                <FaPencilAlt
                                    size={20}
                                    className="absolute w-24 h-24 border-4 rounded-full bg-gray-100 text-gray-900 p-2 cursor-pointer"
                                    onClick={() => setIsEditing(true)}
                                    aria-label="Edit Profile"
                                />
                            ) : (
                                <img
                                    src={user?.profilePicture }
                                    alt="Profile"
                                    className="w-24 h-24 border-solid border-4 border-gray-700 rounded-full object-cover"
                                />
                            )}
                        </div>
                        {isEditing ? (
                            <form className="flex flex-col items-center mt-4" onSubmit={handleProfileUpdate}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mb-2 p-2 rounded bg-stone-900 border border-gray-600 text-white w-60"
                                    placeholder="Enter new username"
                                />
                                <input
                                    type="file"
                                    onChange={handlePictureChange}
                                    className="mb-2 p-2 rounded bg-stone-900 border border-gray-600 text-white w-60"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-blue-400 text-white py-1 px-4 rounded"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <h1 className="text-3xl font-extrabold mt-4">
                                {user?.user?.toUpperCase() || 'Username'}
                            </h1>
                        )}
                    </div>

                    {/* Playlists Section */}
                    <div className="w-full max-w-4xl">
                        <h2 className="text-2xl font-semibold mb-6 border-b border-white pb-2">
                            Your Playlists
                        </h2>
                        <ul className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {playlists && playlists.length > 0 ? (
                                playlists.map((playlist) => (
                                    <Link
                                        key={playlist._id}
                                        to={`/userplaylist/playcomponent/${playlist._id}`}
                                    >
                                        <li
                                            className="flex flex-col w-28 h bg-gradient-to-b from-stone-950 to-stone-600 p-4 rounded-lg sm:w-60 sm:h-72 hover:bg-gray-700 shadow-md transition-transform transform hover:scale-105"
                                        >
                                            <img
                                                src={playlist.songs[0]?.image || '/default-image.png'}
                                                alt={playlist.name}
                                                className="w-full h-20 rounded-lg mb-4 object-cover sm:h-32"
                                            />
                                            <span className="text-lg font-semibold mb-2">
                                                {playlist.name}
                                            </span>
                                            <button className="mt-auto text-sm font-medium text-gray-300 hover:text-white">
                                                View Playlist
                                            </button>
                                        </li>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center">
                                    No playlists available.
                                </p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full z-50">
        <Smnavbar />
      </div>
        </div>
    );
};

export default Profile;
