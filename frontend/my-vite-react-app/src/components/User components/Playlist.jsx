import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getplaylist } from '../../redux/slices/playlistSlice'; // Adjust the import based on your file structure
import Card from './Cards/Card'; // Adjust based on your actual Card component
import CardCarousel from './Cards/CardCarousel'; // Adjust based on your actual CardCarousel component
import { Link } from 'react-router-dom';

const Playlist = () => {
    const dispatch = useDispatch();
    const { playlist, status, error } = useSelector((state) => state.playlist);

    useEffect(() => {
        dispatch(getplaylist());
    }, [dispatch]);

    // Debugging log
    console.log("Current Playlist State:", { playlist, status, error });

    if (status === "pending") {
        return <p className="text-white text-center">Loading...</p>;
    }

    if (status === "rejected") {
        return <p className="text-red-500 text-center">Error: {error}</p>;
    }

    // Ensure `playlist` is an array
    const playlistArray = Array.isArray(playlist) ? playlist : [playlist];

    if (playlistArray.length === 0) {
        return <p className="text-gray-500 text-center">No playlists available.</p>;
    }

    // Extract playlists array
    const newplaylist = playlistArray.map((item) => item.playlists);

    return (
        <div className="bg-stone-900 p-4 text-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Playlists</h2>
            <CardCarousel>
                {newplaylist[0]?.map((playlistItem) => {
                    // Extract the first song and its image
                    const firstSong = playlistItem.songs?.[0]; // Get the first song if it exists
                    const image = firstSong?.image || "default-image-url.jpg"; // Fallback image

                    return (
                        <Link key={playlistItem._id} to={`/playlist/playlcomponent/${playlistItem._id}`}>
                            <Card
                                image={image}
                                title={playlistItem.name} // Playlist name
                                artist={firstSong?.artist || "Unknown Artist"} // Fallback artist
                                id={playlistItem._id}
                            />
                        </Link>
                    );
                })}
            </CardCarousel>
        </div>
    );
};

export default Playlist;
