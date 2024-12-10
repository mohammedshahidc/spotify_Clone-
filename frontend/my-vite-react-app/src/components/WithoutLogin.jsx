import React, { useEffect } from 'react';
import { getplaylist } from '../redux/slices/playlistSlice';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card'; // Import the Card component

const WithoutLogin = () => {
    const dispatch = useDispatch();
    const { playlist, status } = useSelector((state) => state.playlist);
    console.log("state:", playlist);

    useEffect(() => {
        dispatch(getplaylist());
    }, [dispatch]);

    if (status === "pending") {
        return <p>Loading...</p>;
    }
    if (status === "rejected") {
        return <p>Error occurred while fetching playlists.</p>;
    }
   
    return (
        <div className="bg-black min-h-screen text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Playlists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {playlist.map((item) => (
                    item.playlist.map((play) => (
                        <Card
                            key={play._id} 
                            image={play.songs[0].image} 
                            title={play.name}
                            artist={play.songs[0].artist} 
                        />
                    ))
                ))}
            </div>
        </div>
    );
};

export default WithoutLogin;
