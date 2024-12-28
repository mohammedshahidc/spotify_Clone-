import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getplaylist } from '../../redux/slices/playlistSlice'; 
import Card from './Cards/Card'; 
import CardCarousel from './Cards/CardCarousel'; 
import { Link } from 'react-router-dom';
import Dives from './Dives';

const Playlist = () => {
    const dispatch = useDispatch();
    const { playlist, status, error } = useSelector((state) => state.playlist);

    useEffect(() => {
        dispatch(getplaylist());
    }, [dispatch]);

    
    console.log("Current Playlist State:", { playlist, status, error });

    if (status === "pending") {
        return <p className="text-white text-center">Loading...</p>;
    }

    if (status === "rejected") {
        return <p className="text-red-500 text-center">Error: {error}</p>;
    }

  
    const playlistArray = Array.isArray(playlist) ? playlist : [playlist];

    if (playlistArray.length === 0) {
        return <p className="text-gray-500 text-center">No playlists available.</p>;
    }

    
    const newplaylist = playlistArray.map((item) => item.playlists);

    return (
        <div className="bg-stone-950 p-4 text-white rounded-lg shadow-lg">
            
            <h2 className="text-xl font-bold mb-4">Playlists</h2>
            <CardCarousel>
                {newplaylist[0]?.map((playlistItem) => {
                   
                    const firstSong = playlistItem.songs?.[0]; 
                    const image = firstSong?.image || "default-image-url.jpg"; 
                    return (
                        <Link key={playlistItem._id} to={`/playlist/playlcomponent/${playlistItem._id}`}>
                            <Card
                                image={image}
                                title={playlistItem.name}
                                artist={firstSong?.artist || "Unknown Artist"} 
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
