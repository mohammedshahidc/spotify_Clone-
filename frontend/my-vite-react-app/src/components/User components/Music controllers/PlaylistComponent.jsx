import { useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";
import Navbar from "../Layout/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MusicCard from "../Cards/MusicCard";
import { getplaylist } from "../../../redux/slices/playlistSlice";
import { getartist } from "../../../redux/slices/artist.slice";
import { getAlbums } from "../../../redux/slices/albumSlice";

const PlaylistComponent = () => {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist.playlist);
  const artistSongs = useSelector((state) => state.artist.artist);
  const albums = useSelector((state) => state.albums.albums);

  const { id, artist, albumid } = useParams();

  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredAlbum, setFilteredAlbum] = useState([]);


  useEffect(() => {
    dispatch(getplaylist());
    dispatch(getartist());
    dispatch(getAlbums());
  }, [dispatch]);


  useEffect(() => {
    if (playlist.length > 0 && id) {
      const playlists = playlist[0]?.playlist.filter((item) => item._id === id);
      setFilteredPlaylists(playlists || []);
    }
  }, [playlist, id]);


  useEffect(() => {
    if (artistSongs.length > 0 && artist) {
      const foundArtist = artistSongs.find((art) => art.artist === artist);
      if (foundArtist) {
        setFilteredSongs(foundArtist.songs || []);
      }
    }
  }, [artistSongs, artist]);


  useEffect(() => {
    if (albums.length > 0 && albumid) {
      const filtered = albums.filter((album) => album._id === albumid);
      setFilteredAlbum(filtered || []);
    }
  }, [albums, albumid]);

  const image = filteredSongs?.map((song) => song?.image).toString()
  console.log("image:", image);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r fixed from-gray-800 to-gray-900 text-white">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-1/5 shadow-lg">
          <Sidebar />
        </div>
        <div className="flex-1 p-6 overflow-y-scroll">
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map((item) => (
              <MusicCard
                key={item._id}
                album={{
                  image: item.image,
                  title: item.title,
                  artist: item.artist,
                  year: item.year,
                  details: `${item.songs.length} songs`,
                }}
                songs={item.songs.map((song) => ({
                  image: song.image || item.image,
                  title: song.title,
                  duration: song.duration || "N/A",
                  audioSrc: song.fileUrl,
                }))}
              />
            ))
          ) : filteredSongs.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Songs by {artist}:
              </h2>
              {filteredSongs.map((song, index) => (
                <MusicCard
                  key={index}
                  album={{
                    image: image,
                    title: song.title,
                    artist: artist,
                    details: song.duration || "N/A",
                  }}
                  songs={[
                    {
                      image: image,
                      title: song.title,
                      duration: song.duration || "N/A",
                      audioSrc: song.fileUrl,
                    },
                  ]}
                  gradient="bg-gradient-to-r from-purple-900 to-black
"

                />
              ))}
            </>
          ) : filteredAlbum.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Songs in the Album:
              </h2>
              {filteredAlbum.map((album) =>
                album.songs?.map((song, index) => (
                  <MusicCard
                    key={index}
                    album={{
                      image: song[0]?.image,
                      title: song.title,
                      artist: album.artist,
                      details: song.duration,
                    }}
                    songs={[
                      {
                        image: song.image,
                        title: song.title,
                        duration: song.duration || "N/A",
                        audioSrc: song.fileUrl,
                      },
                    ]}
                    gradient="bg-gradient-to-r from-teal-800 to-blue-900"
                  />
                ))
              )}
            </>
          )
            : (
              <div className="text-center text-lg mt-20">
                <p>No content available.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistComponent;
