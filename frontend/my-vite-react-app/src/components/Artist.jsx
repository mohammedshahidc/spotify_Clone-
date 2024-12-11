import React, { useEffect } from "react";
import { getAllsongs } from "../redux/slices/songSlice";
import { useDispatch, useSelector } from "react-redux";
import CardCarousel from "./CardCarousel";
import Card from "./Card";

const Artist = () => {
    const dispatch = useDispatch();
    const { songs, status } = useSelector((state) => state.song);

    useEffect(() => {
        dispatch(getAllsongs());
    }, [dispatch]);

    if (status === "pending") {
        return <p className="text-white">Loading...</p>;
    }
    if (status === "rejected") {
        return <p className="text-red-500">Error occurred while fetching songs.</p>;
    }

    // Filters for each artist
    const artistData = [
        { name: "Dabzee", songs: songs.filter((song) => song.type === "rap") },
        { name: "Arijit Singh", songs: songs.filter((song) => song.artist === "Arijit Singh") },
        {
            name: "Sushin Shyam",
            songs: songs.filter(
                (song) =>
                    song.artist === "sushin shyam" ||
                    song.artist === "Dabzee, Sushin Shyam" ||
                    song.artist === "Sushin Shyam and Vedan" ||
                    song.artist === "sushin shyam"
            ),
        },
        {
            name: "Anirudh Ravichander",
            songs: songs.filter((song) => song.artist === "Anirudh Ravichander"),
        },
        {
            name: "Haricharan & Melodies",
            songs: songs.filter((song) => song.artist === "Haricharan" || song.type === "melody"),
        },
    ];

    return (
        <div className="bg-black text-white">
        <h1 className="text-2xl font-bold ">Popular artists</h1>
        <CardCarousel>
            {artistData.map(({ name, songs }) => {
                const firstSong = songs[0];
                return (
                    <Card
                        key={name}
                        image={firstSong?.image || "default-placeholder-image.jpg"}
                        title={name}
                        artist={firstSong?.artist || "No Songs Available"}
                    />
                );
            })}
        </CardCarousel>
    </div>
    );
};

export default Artist;
