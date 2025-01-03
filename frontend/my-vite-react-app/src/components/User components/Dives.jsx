import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfavourite } from "../../redux/slices/favouriteSlice";
import { getplaylist } from "../../redux/slices/playlistSlice";
import { Link } from "react-router-dom";

const Dives = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.admin.admin);

    useEffect(() => {
        if (user) {
            dispatch(getfavourite());
            dispatch(getplaylist());
        }
    }, [dispatch, user]);

    const { favourite } = useSelector((state) => state.favourite);
    const { playlist } = useSelector((state) => state.playlist);

    return (
        <div className="bg-stone-950 p-6 text-white rounded-lg shadow-xl max-w-5xl mx-auto mt-8">
            {/* Gradient Header */}
            <div className="bg-gradient-to-b from-violet-950 to-gray-700 min-h-[25vh] rounded-lg p-6 shadow-md">
                {/* Button Section */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
                    <Link to="/">
                        <button className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-gray-700 transition">
                            All
                        </button>
                    </Link>
                    <Link to="/music">
                        <button className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-gray-700 transition">
                            Music
                        </button>
                    </Link>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* Liked Songs */}
                    <Link to="/likedsongs">
                        <div className="bg-stone-900 rounded-lg flex items-center p-3 gap-4 hover:scale-105 hover:bg-stone-800 transition">
                            <img
                                src={favourite[0]?.image || "default-image-url.jpg"}
                                alt="Liked Songs"
                                className="h-12 w-12 object-cover rounded-lg"
                            />
                            <h1 className="text-sm font-medium">Liked Songs</h1>
                        </div>
                    </Link>
                    {/* Playlists */}
                    {playlist?.playlists?.map((pl) => (
                        <Link key={pl._id} to={`/playlist/playlcomponent/${pl._id}`}>
                            <div className="bg-stone-900 rounded-lg flex items-center p-2 min-w-fit gap-4 hover:scale-105 max-w-fit hover:bg-stone-800 transition">
                                <img
                                    src={pl.songs[0]?.image || "default-image-url.jpg"}
                                    alt={pl.name}
                                    className="h-12 w-12 object-cover rounded-lg"
                                />
                                <h1 className="text-sm  font-normal ">{pl.name}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dives;
