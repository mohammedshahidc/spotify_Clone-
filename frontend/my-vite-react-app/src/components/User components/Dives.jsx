import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getfavourite } from '../../redux/slices/favouriteSlice';
import { getplaylist } from '../../redux/slices/playlistSlice';
import { Link } from 'react-router-dom';

const Dives = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getfavourite());
        dispatch(getplaylist());
    }, [dispatch]);

    const { favourite } = useSelector((state) => state.favourite);
    const { playlist } = useSelector((state) => state.playlist);

    return (
        <div className="bg-stone-950 p-4 text-white rounded-lg shadow-lg">
        <div className="bg-gradient-to-b from-violet-950 to-gray-500 min-h-[25vh] max-w-4xl mx-auto flex flex-col p-3 rounded-md">
            {/* Button Section */}
            <div className="flex flex-wrap justify-center sm:justify-start space-x-2 mb-4">
                <Link to={"/"}>
                <button className="bg-white text-black rounded px-3 py-1 text-sm font-medium hover:bg-gray-200">
                    All
                </button>
                </Link>
                <Link>
                <button className="bg-white text-black rounded px-3 py-1 text-sm font-medium hover:bg-gray-200">
                    Music
                </button>
                </Link>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Liked Songs */}
                <Link  to={"/likedsongs"}>
                <div className="bg-transparent w-full sm:w-44 h-14 rounded-md flex items-center text-white shadow-md p-2 space-x-2 transition-transform transform hover:scale-105 hover:bg-stone-900">
                    <img
                        src={favourite[0]?.image}
                        alt="Liked Songs"
                        className="h-fit w-10 object-cover rounded-sm"
                    />
                    <h1 className="text-sm font-medium">Liked Songs</h1>
                </div>
                </Link>
                {/* Playlists */}
                {playlist.playlists?.map((pl) => (
                    <Link key={pl._id} to={`/playlist/playlcomponent/${pl._id}`}>
                    <div
                        
                        className="bg-transparent w-full sm:w-44 h-14 rounded-md flex items-center text-white shadow-md p-2 space-x-2 transition-transform transform hover:scale-105 hover:bg-stone-900"
                    >
                        <img
                            src={pl.songs[0]?.image || 'default-image-url.jpg'}
                            alt={pl.name}
                            className="h-fit w-10 object-cover rounded-sm"
                        />
                        <h1 className="text-sm font-medium">{pl.name}</h1>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Dives;
