import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfavourite } from "../redux/slices/favouriteSlice";
import AlbumCard from "./MusicCard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaHeart } from "react-icons/fa";

const Likedsong = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfavourite());
  }, [dispatch]);

  const { favourite, status } = useSelector((state) => state.favourite);

  console.log("liked:", favourite);

  // Transform all favourite songs into the format expected by AlbumCard
  const songs = favourite.map((song) => ({
    image:<FaHeart size={40} className="w-40 h-40 text-white bg-gradient-to-t from-blue-700 to-blue-100"/>,
    title: song.title,
    duration: song.duration || "N/A",
    audioSrc: song.fileUrl,
  }));

  return (
    <div>
        <Navbar/>
        <div className="flex fixed overflow-y-scroll">
            <Sidebar/>
      {songs.length > 0 ? (
        <AlbumCard
          album={{
            name: "Liked Songs",
          }}
          songs={songs}
          image={<FaHeart size={160} className="text-white bg-gradient-to-t from-blue-700 to-blue-100 rounded-lg" />}
          gradient='bg-gradient-to-t from-blue-900 to-blue-200'
        />
      ) : (
        <p className="text-white text-center mt-4">No liked songs found.</p>
      )}
    </div>
    </div>
  );
};

export default Likedsong;
