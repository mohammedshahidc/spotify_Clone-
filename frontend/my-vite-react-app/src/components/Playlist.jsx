import React, { useEffect } from 'react'
import { getplaylist } from "../redux/slices/playlistSlice";
import { useSelector, useDispatch } from "react-redux";
import CardCarousel from "./CardCarousel";
import Card from "./Card";
const Playlist = () => {

    const dispatch = useDispatch();
    const { playlist, status } = useSelector((state) => state.playlist);

    useEffect(() => {
        dispatch(getplaylist());
    }, [dispatch]);

   
    if (status === "pending") {
        return <p className="text-white">Loading...</p>;
    }
    if (status === "rejected") {
        return <p className="text-red-500">Error occurred while fetching playlists.</p>;
    }

    return (
        <div className="bg-black text-white p-4 ">
            <h1 className="text-2xl font-bold ">Playlists</h1>
            <CardCarousel>
                {playlist.map((item) =>
                    item.playlist.map((play) => (
                        <Card
                            key={play._id}
                            image={play.songs[0]?.image}
                            title={play.name}
                            artist={play.songs[0]?.artist}
                        />
                    ))
                )}
            </CardCarousel>
        </div>
    );
}

export default Playlist
