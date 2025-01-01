import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlladminSongs } from '../redux/slices/admin slices/AdminSongSlice';
import Navbar from '../components/User components/Layout/Navbar/Navbar'; // Adjust the import path as necessary
import AdminSidebar from './Admin layouts/AdminSidebar'; // Adjust the import path as necessary

const Adminsong = () => {
    const dispatch = useDispatch();
    const songs = useSelector((state) => state.adminSongs.adminSongs);

    useEffect(() => {
        dispatch(getAlladminSongs());
    }, [dispatch]);

    return (
        <div className="flex flex-col fixed w-screen h-screen">
            <Navbar />
            <div className="flex flex-1 w-full">
                <AdminSidebar />
                <div className="bg-black text-white p-4 w-full overflow-hidden">
                    <h1 className="text-2xl font-bold mb-4">Songs</h1>
                    <div className="h-[calc(100vh-64px)] overflow-y-scroll">
                        {/* Adjust height based on Navbar height */}
                        {songs && songs.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-800 border border-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="border-b border-gray-700 px-4 py-2 text-center">Title</th>
                                            <th className="border-b border-gray-700 px-4 py-2 text-center">Artist</th>
                                            <th className="border-b border-gray-700 px-4 py-2 text-center">Album</th>
                                            <th className="border-b border-gray-700 px-4 py-2 text-center">Duration</th>
                                            <th className="border-b border-gray-700 px-4 py-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {songs.map((song) => (
                                            <tr key={song._id} className="hover:bg-gray-700">
                                                <td className="border-b border-gray-600 px-4 py-2 text-center">{song.title}</td>
                                                <td className="border-b border-gray-600 px-4 py-2 text-center">{song.artist}</td>
                                                <td className="border-b border-gray-600 px-4 py-2 text-center">{song.album}</td>
                                                <td className="border-b border-gray-600 px-4 py-2 text-center">{song.duration}</td>
                                                <td className="border-b border-gray-600 px-4 py-2 text-center">
                                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                                        Edit
                                                    </button>
                                                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No songs found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adminsong;
