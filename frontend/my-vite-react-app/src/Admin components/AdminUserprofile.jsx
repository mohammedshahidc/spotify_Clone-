import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { blockuser, getAllusers } from '../redux/slices/admin slices/adminusersslice';
import { getplaylist } from '../redux/slices/playlistSlice';

import AdminSidebar from './Admin layouts/AdminSidebar';
import AdminNavbar from './Admin layouts/AdminNavbar';
import { toast } from 'react-toastify';

const AdminUserprofile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allusers.allusers);
    const { playlist } = useSelector((state) => state.playlist);

    useEffect(() => {
        dispatch(getAllusers());
        dispatch(getplaylist());
    }, [dispatch]);

    if (!users) {
        return <div className="text-white">User not found</div>;
    }

    const user = users.find((userr) => userr._id === id);
    const userplaylist = playlist.playlists.filter((play) => play.user === id);

    if (!user) {
        return <div className="text-white">User not found</div>;
    }

    const { name, email, profilePicture, likedSongs,block} = user;
const handleblock= async ()=>{
    try {
        await dispatch(blockuser(id))
        dispatch(getAllusers())
        
    } catch (error) {
        console.log(error);
        toast.error('an error occured')
    }

}
    return (
        <div className="bg-black h-screen flex flex-col">
          <AdminNavbar/>
            <div className="flex flex-grow overflow-hidden">
                {/* Sidebar */}
                <div className=" bg-black">
                    <AdminSidebar />
                </div>

                {/* Scrollable User Details */}
                <div className="w-3/4 overflow-y-scroll bg-black p-6 text-white">
                    {/* User Details */}
                    <div className="flex items-center mb-8">
                        <img
                            src={profilePicture}
                            alt={`${name}'s profile`}
                            className="w-16 h-16 rounded-full mr-4 bg-white"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{name}</h2>
                            <p className="text-sm">{email}</p>
                            <button className='bg-green-700 text-white mt-5 w-20 h-6 rounded-md hover:bg-green-300 'onClick={handleblock}  aria-label={block ? 'Unblock user' : 'Block user'}>{block?'Unblock':'Block'}</button>
                        </div>
                    </div>

                    {/* Liked Songs Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Liked Songs</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {likedSongs?.length > 0 ? (
                                likedSongs.map((song, index) => (
                                    <div
                                        key={index}
                                        className="bg-green-800 p-4 rounded shadow hover:shadow-lg transition-all flex flex-col items-center"
                                    >
                                        <img
                                            src={song.image || "https://via.placeholder.com/150"}
                                            alt={song.title}
                                            className="w-32 h-32 rounded mb-4"
                                        />
                                        <h4 className="text-lg font-bold">{song.title}</h4>
                                        <p className="text-sm">{song.artist}</p>
                                        <p className="text-sm italic">{song.album}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm">No liked songs</p>
                            )}
                        </div>
                    </div>

                    {/* Playlists Section */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Playlists</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userplaylist?.length > 0 ? (
                                userplaylist.map((playlist, index) => (
                                    <div
                                        key={index}
                                        className="bg-green-800 p-4 rounded shadow hover:shadow-lg transition-all flex flex-col items-center"
                                    >
                                        <img
                                            src={playlist?.songs[0]?.image || "https://via.placeholder.com/150"}
                                            alt={playlist.name}
                                            className="w-32 h-32 rounded mb-4"
                                        />
                                        <h4 className="text-lg font-bold">{playlist.name}</h4>
                                        <p className="text-sm">{playlist.songs.length} Songs</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm">No playlists</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserprofile;
