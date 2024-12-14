import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AlbumCard from "./MusicCard";
import { getplaylist } from "../redux/slices/playlistSlice";
import { getAllsongs } from "../redux/slices/songSlice";
import { getartist } from "../redux/slices/artist.slice";

const PlaylistComponent = () => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.playlist);
  const artistSongs = useSelector((state) => state.artist.artist);
  const { id, artist } = useParams();

  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [albumNames, setAlbumNames] = useState([]);

  // Fetch playlists when the component mounts or `id` changes
  useEffect(() => {
    dispatch(getplaylist());
  }, [dispatch]);

  useEffect(() => {
    if (playlist.length > 0 && id) {
      const playlists = playlist[0]?.playlist.filter((item) => item._id === id);
      setFilteredPlaylists(playlists || []);
    }
  }, [playlist, id]);

  // Fetch artists when the component mounts
  useEffect(() => {
    dispatch(getartist());
  }, [dispatch]);

  useEffect(() => {
    if (artistSongs.length > 0 && artist) {
      const foundArtist = artistSongs.find((art) => art.artist === artist);
      if (foundArtist) {
        setFilteredSongs(foundArtist.songs || []);
        const albums = foundArtist.songs.map((song) => song.album);
        setAlbumNames(albums);
      } else {
        setFilteredSongs([]);
        setAlbumNames([]);
      }
    }
  }, [artistSongs, artist]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="flex-1">
          {/* Render playlists if available */}
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map((item) => (
              <AlbumCard
                key={item._id}
                album={{
                  image: item[0]?.fileUrl,
                  title: item.title,
                  artist: item.artist,
                  year: item.year,
                  details: `${item.songs.length} songs`,
                }}
                songs={item.songs.map((song) => ({
                  title: song.title,
                  duration: song.duration || "N/A",
                  audioSrc: song.fileUrl,
                }))}
              />
            ))
          ) : filteredSongs.length > 0 ? (
            <div>
              <h2 className="text-white">Songs by {artist}:</h2>
              {filteredSongs.map((song, index) => (
                <AlbumCard
                  key={index}
                  album={{
                    image: song.fileUrl, // Assuming the song has a `fileUrl` for the image
                    title: song.artist,
                    artist: song.artist, // Assuming the artist is available
                    details: song.duration || "N/A",
                  }}
                  songs={[
                    {
                      title: song.title,
                      duration: song.duration || "N/A",
                      audioSrc: song.fileUrl,
                    },
                  ]}
                />
              ))}
            </div>
          ) : (
            <p className="text-white">No songs found for this artist.</p>
          )}

          {/* Optional: Display album names */}
          {albumNames.length > 0 && (
            <div>
              <h2 className="text-white">Albums:</h2>
              <ul>
                {albumNames.map((album, index) => (
                  <li key={index} className="text-white">
                    {album}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistComponent;
