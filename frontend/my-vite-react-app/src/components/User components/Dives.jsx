import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getfavourite } from '../../redux/slices/favouriteSlice';
import { getplaylist } from '../../redux/slices/playlistSlice';

const Dives = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getfavourite());
        dispatch(getplaylist());
    }, [dispatch]);

    const { favourite } = useSelector((state) => state.favourite);
    const { playlist } = useSelector((state) => state.playlist);

    return (
        <div className="bg-gradient-to-b from-violet-950 to-gray-500 min-h-[50vh] max-w-5xl mx-auto flex flex-col p-6 rounded-lg">
            {/* Button Section */}
            <div className="flex flex-wrap justify-center sm:justify-start space-x-2 sm:space-x-4 mb-6">
                <button className="bg-white text-black rounded-md px-4 py-2 font-semibold hover:bg-gray-200">
                    All
                </button>
                <button className="bg-white text-black rounded-md px-4 py-2 font-semibold hover:bg-gray-200">
                    Music
                </button>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Liked Songs */}
                <div className="bg-transparent w-full sm:w-56 h-20 rounded-lg flex items-center text-white shadow-lg p-4 space-x-4 transition-transform transform hover:scale-105 hover:bg-stone-900">
                    <img
                        src={favourite[0]?.image}
                        alt="Liked Songs"
                        className="h-fit w-16 object-cover"
                    />
                    <h1 className="text-lg font-semibold">Liked Songs</h1>
                </div>

                {/* Playlists */}
                {playlist.playlists?.map((pl) => (
                    <div
                        key={pl._id}
                        className="bg-transparent w-full sm:w-56 h-20 rounded-lg flex items-center text-white shadow-lg p-4 space-x-4 transition-transform transform hover:scale-105 hover:bg-stone-900"
                    >
                        <img
                            src={pl.songs[0]?.image || 'default-image-url.jpg'}
                            alt={pl.name}
                            className="h-fit w-16 object-cover"
                        />
                        <h1 className="text-lg font-semibold">{pl.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dives;
