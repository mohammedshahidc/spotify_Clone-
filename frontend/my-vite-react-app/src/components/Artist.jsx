import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardCarousel from "./CardCarousel";
import Card from "./Card";
import { getartist } from "../redux/slices/artist.slice";
import { Link } from "react-router-dom";

const Artist = () => {
    const dispatch = useDispatch();
    const { artist } = useSelector((state) => state.artist);
console.log("artist i :",artist);
    useEffect(() => {
        dispatch(getartist());
    }, [dispatch]);

    return (
        <div className="bg-gray-900 p-4 text-white rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-4">Popular Artists</h1> 
            <CardCarousel>
                {artist && artist.length > 0 ? (
                    artist.map((art) =>
                        art.songs && art.songs.length > 0 ? (
                            art.songs.map((song) => (
                                
                                <Link key={song._id} to={`/artist/playlcomponent/${art.artist}`}>
                                <Card 
                                     
                                    image={song.image}
                                    title={song.artist}
                                    artist={art._id}
                                />
                                </Link>
                            ))
                        ) : null
                    )
                ) : (
                    <div>No artists found</div>
                )}
            </CardCarousel>
        </div>
    );
};

export default Artist;
